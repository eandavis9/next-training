export const ERRORS = {
    unexpectedError: "unexpected-error",
    validationError: "validation-error",
  };
  
  export const ERROR_MESSAGES: Record<string, string> = {
     
    [ERRORS.validationError]:
        "Please check all the fields.",
    [ERRORS.unexpectedError]:
        "An unexpected error occurred when processing this request. Please try again later.",
  }