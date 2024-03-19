export const ERRORS = {
    unexpectedError: "unexpected-error",
    validationError: "422",
  };
  
  export const ERROR_MESSAGES: Record<string, string> = {
     
    [ERRORS.validationError]:
        "Please check all the fields.",
    [ERRORS.unexpectedError]:
        "An unexpected error occurred. Please try again or if the error persists, please reach out to support at support@you-source.com",
  }