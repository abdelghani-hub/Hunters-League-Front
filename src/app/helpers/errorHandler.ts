export default class ErrorHandler {
  static handleServerErrors(errors: { [key: string]: string | string[] | (string | string[])[] }) {
    // Reset server errors
    let serverErrors: any = {};

    for (const field in errors) {
      const errorValue = errors[field];
      if (typeof errorValue === 'string') {
        serverErrors[field] = [errorValue];
      } else if (Array.isArray(errorValue)) {
        serverErrors[field] = errorValue.flatMap(item =>
          Array.isArray(item) ? item : [item]
        );
      }
    }

    return serverErrors;
  }
}
