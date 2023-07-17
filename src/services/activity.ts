
import { GetActivityListQuery, GetActivityListResponse } from "@/models/activity"
import { apis } from "@/util/api"
import { httpClient } from "@/util/http-client"

const getActivityList = async(args: GetActivityListQuery) => {
    const response = await httpClient.get({url: apis.activity.getActivityList, params: args})
    return response.data! as GetActivityListResponse
}

export const activityServices = {
    getActivityList
}