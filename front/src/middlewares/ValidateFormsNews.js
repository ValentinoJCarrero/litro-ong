export const ValidateFormsNews = (values) => {
    const errors = {};
  
    if (!values.title) {
      errors.title = "El Titulo es requerido";
    }else if (values.title.length > 10) {
      errors.title = "El titulo debe tener minimo 10 caracteres";
    }else if (values.title.length < 40 ) {
      errors.title = "El titulo debe tener maximo 40 caracteres";
    }
  
    if (!values.subtitle) {
      errors.subtitle = "El subtitulo es requerido";
    } else if (values.subtitle.length > 10 ) {
      errors.subtitle = "El subtitulo debe tener minimo 10 caracteres";
    }else if (values.subtitle.length < 40 ) {
      errors.subtitle = "El subtitulo debe tener maximo 30 caracteres";
    }
  
    if (!values.description) {
      errors.description = "La descripcion es requerida";
    }else if (values.description.length > 100) {
      errors.description = "La descripcion  debe tener minimo 100 caracteres";
    }else if (values.description.length < 800 ) {
      errors.description = "La descripcion  debe tener maximo 800 caracteres";
    }
  
    return errors;
  };