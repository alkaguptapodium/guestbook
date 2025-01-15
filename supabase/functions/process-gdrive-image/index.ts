import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { driveUrl } = await req.json()
    console.log('Processing Google Drive URL:', driveUrl)

    if (!driveUrl) {
      throw new Error('No Google Drive URL provided')
    }

    // Extract file ID from Google Drive URL
    const fileId = driveUrl.match(/[-\w]{25,}(?!.*[-\w]{25,})/)
    if (!fileId) {
      throw new Error('Invalid Google Drive URL')
    }

    // Construct direct download URL
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId[0]}`
    console.log('Download URL:', downloadUrl)

    // Download the image
    const response = await fetch(downloadUrl)
    if (!response.ok) {
      throw new Error('Failed to download image from Google Drive')
    }

    const imageBlob = await response.blob()
    console.log('Image downloaded successfully')

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Upload to Supabase Storage
    const timestamp = new Date().getTime()
    const fileName = `${timestamp}_${crypto.randomUUID()}.${imageBlob.type.split('/')[1]}`
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('events')
      .upload(fileName, imageBlob, {
        contentType: imageBlob.type,
        cacheControl: '3600'
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      throw new Error('Failed to upload image to Supabase Storage')
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('events')
      .getPublicUrl(fileName)

    console.log('Successfully processed image. Public URL:', publicUrl)

    return new Response(
      JSON.stringify({ url: publicUrl }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )

  } catch (error) {
    console.error('Error processing image:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 400
      }
    )
  }
})