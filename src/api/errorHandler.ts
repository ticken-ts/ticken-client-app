import { isAxiosError } from "axios"

export const apiErrorHandler = (error: any) => {
    if (isAxiosError(error)) {
      if (error.response) {
        throw {
          code: error.response.data.code,
          message: error.response.data.message
        }
      } else if (error.request) {
        throw {
          code: -1,
          message: "No response from server"
        }
      } else {
        return {
          code: -1,
          message: error.message
        }
      }
    }
    throw {
      code: -1,
      message: "Unknown error"
    }
  }