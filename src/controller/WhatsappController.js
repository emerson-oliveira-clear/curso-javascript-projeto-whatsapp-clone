class WhatsAppController{

constructor(){

    console.log('ok ok')

    this.loadElements();

}

loadElements(){

    this.el = {};

    document.querySelectorAll('[id]').forEach(element =>{

        this.el[Format.getCamelCasse(element.id)] = element;

    })

}

}