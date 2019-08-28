class ValidationError {
    message: string;
  name: string;

  constructor(name: string, message: string) {
    this.message = message;
    this.name = name;
  }
}

export default ValidationError;
