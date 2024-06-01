import { StorageSharedKeyCredential, BlobServiceClient } from "@azure/storage-blob"
import { v4 as uuidv4 } from "uuid"

export async function uploadImageToAzure(base64Image, imageName, accountName, accountKey, containerName) {
  const uniqueName = generateUniqueFileName(imageName)
  const credentials = new StorageSharedKeyCredential(accountName, accountKey)
  const blobService = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, credentials)
  const containerClient = blobService.getContainerClient(containerName)
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "")
  const buffer = Buffer.from(base64Data, "base64")

  const blobClient = containerClient.getBlockBlobClient(uniqueName)

  try {
    await blobClient.uploadData(buffer, {
      blobHTTPHeaders: {
        blobContentType: `image/${imageName.split(".").pop()}`
      }
    })

    return `https://${accountName}.blob.core.windows.net/${containerName}/${uniqueName}`
  } catch (error) {
    throw new Error("Failed to upload image to Azure Storage: " + error.message)
  }
}

function generateUniqueFileName(originalFileName) {
  const uniqueId = uuidv4()
  const fileExtension = originalFileName.split(".").pop()

  return `${uniqueId}.${fileExtension}`
}
