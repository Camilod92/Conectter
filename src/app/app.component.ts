import { Data } from './interface/data';
import { Component, OnInit } from '@angular/core';
import{ServicioService} from './servicio/servicio.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  
  documentosPara:any;
  title = 'conectter';
  crear=false
  documentos:any;
  data= {
    id:'',
    title:''
 };
 data1= {

  title:''
};
dato:Data;
  constructor(private doc:ServicioService) {
   
  }

  
  ngOnInit() {
    this.inicializarArray();
    setTimeout( () =>  {
      this.datos();

    }, 1000)

   
  }
 
  inicializarArray() {
   this.doc.obtenerDatos().subscribe((data)=>{
     this.documentos = data;
     console.log(this.documentos)
     
   })
  
  }

  obtenerDato(id){
    this.doc.obtenerDato(id)
    .subscribe(dato=> {
      this.dato=dato;
    })

    this.crear=!this.crear
  }

  crearDato(data){
    data=this.data;

    this.doc.crearDato(data)
    .subscribe((newData)=>{
      this.documentos.unshift(newData)
    });

    
  }
datos(){
  console.log("datos",this.documentos);
  this.documentosPara=this.documentos;
  console.log("datosPara",this,this.documentosPara)
}

  editarDato(data1, index:number){
    
   const dato={
id:this.dato.id,
userId:this.dato.userId,
title:this.data1.title,
completed:this.dato.completed
   };
   this.documentos.splice(index+-1,1,
    dato)
    this.doc.editarDato(dato)
    .subscribe(data=>{
console.log(data);
    })
   
this.crear=!this.crear;
  
  }

  eliminarDato(id:string, index:number){
    this.doc.eliminarDato(id)
    .subscribe((data)=>
    this.documentos.splice(index, 1))
    
  }


  filterDocumentos(event) {


    this.datos();
    console.log(event.target.value);
    const val = event.target.value;
    if (val && val.trim() != '') {
      this.documentosPara= this.documentosPara.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


}
