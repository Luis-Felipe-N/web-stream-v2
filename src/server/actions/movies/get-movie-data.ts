import axios from "axios";

export async function getMovieData(id: string) {
  const baseUrl = 'https://cdnapisec.kaltura.com/api_v3/service/multirequest'

  const requestData = {
    "1": {
      "service": "session",
      "action": "startWidgetSession",
      "widgetId": "_2267831"
    },
    "2": {
      "service": "baseEntry",
      "action": "list",
      "ks": "{1:result:ks}",
      "filter": {
        "redirectFromEntryId": id
      },
      "responseProfile": {
        "type": 1,
        "fields": "id,referenceId,name,description,thumbnailUrl,dataUrl,duration,msDuration,flavorParamsIds,mediaType,type,tags,dvrStatus,externalSourceType,status,createdAt,updatedAt,endDate,plays,views,downloadUrl,creatorId"
      }
    },
    "3": {
      "service": "baseEntry",
      "action": "getPlaybackContext",
      "entryId": "{2:result:objects:0:id}",
      "ks": "{1:result:ks}",
      "contextDataParams": {
        "objectType": "KalturaContextDataParams",
        "flavorTags": "all"
      }
    },
    "4": {
      "service": "metadata_metadata",
      "action": "list",
      "filter": {
        "objectType": "KalturaMetadataFilter",
        "objectIdEqual": "{2:result:objects:0:id}",
        "metadataObjectTypeEqual": "1"
      },
      "ks": "{1:result:ks}"
    },
    "apiVersion": "3.3.0",
    "format": 1,
    "ks": "",
    "clientTag": "html5:v3.17.9-canary.0-dbe3d1d",
    "partnerId": 2267831
  };

  const response = axios.post(baseUrl, JSON.stringify(requestData))
}
