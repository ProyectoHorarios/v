import { Component, OnInit } from '@angular/core';
import { ExcelJson } from 'src/app/interfaces/excel-json.interface';
import { User } from 'src/app/interfaces/user.interface';
import { ExportService } from 'src/app/services/export.service';
import { ProfesorService } from '../../services/empleado.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  users!: any[];
  maestrosss:any = []
  mal:any
  user!: any[];
  constructor( private exportService: ExportService,
               private profesorService:ProfesorService) {
                this.maestrosss  = []
                this.profesorService.mostrarProfesores().subscribe(res=>{
                  let profes:any = []
                   res.forEach((element:any) => {
                    profes.push({
                      id: element.payload.doc.id,
                      ...element.payload.doc.data()
                    })
                   });
                   this.maestrosss = profes
                  })

                }

  async ngOnInit(){

    localStorage.removeItem('ruta');
    localStorage.setItem('ruta', '/inicio');

    this.maestrosss  = []
    this.profesorService.mostrarProfesores().subscribe(res=>{
      let profes:any = []
       res.forEach((element:any) => {
        profes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
       });
       this.maestrosss = profes
       this.user = []
    for (let i = 0; i < this.maestrosss.length; i++) {

      this.user.push({
        id:this.maestrosss[i].id,
        firstName:{
          uno: this.maestrosss[i].materias.lunes[0],
          dos: this.maestrosss[i].materias.lunes[1],
          tres: this.maestrosss[i].materias.lunes[2],
          cuatro: this.maestrosss[i].materias.lunes[3],
          cinco: this.maestrosss[i].materias.lunes[4],
          seis: this.maestrosss[i].materias.lunes[5],
          siete: this.maestrosss[i].materias.lunes[6],
          unoa: this.maestrosss[i].materias.martes[0],
          dosa: this.maestrosss[i].materias.martes[1],
          tresa: this.maestrosss[i].materias.martes[2],
          cuatroa: this.maestrosss[i].materias.martes[3],
          cincoa: this.maestrosss[i].materias.martes[4],
          seisa: this.maestrosss[i].materias.martes[5],
          sietea: this.maestrosss[i].materias.martes[6],
          unob: this.maestrosss[i].materias.miercoles[0],
          dosb:  this.maestrosss[i].materias.miercoles[1],
          tresb:  this.maestrosss[i].materias.miercoles[2],
          cuatrob:  this.maestrosss[i].materias.miercoles[3] ,
          cincob:  this.maestrosss[i].materias.miercoles[4] ,
          seisb:  this.maestrosss[i].materias.miercoles[5] ,
          sieteb:  this.maestrosss[i].materias.miercoles[6],
          unoc:  this.maestrosss[i].materias.jueves[0],
          dosc: this.maestrosss[i].materias.jueves[1],
          tresc: this.maestrosss[i].materias.jueves[2],
          cuatroc: this.maestrosss[i].materias.jueves[3],
          cincoc:this.maestrosss[i].materias.jueves[4],
          seisc: this.maestrosss[i].materias.jueves[5],
          sietec: this.maestrosss[i].materias.jueves[6],
          unod: this.maestrosss[i].materias.viernes[0],
          dosd:this.maestrosss[i].materias.viernes[1],
          tresd: this.maestrosss[i].materias.viernes[2],
          cuatrod: this.maestrosss[i].materias.viernes[3],
          cincod: this.maestrosss[i].materias.viernes[4],
          seisd: this.maestrosss[i].materias.viernes[5],
          sieted: this.maestrosss[i].materias.viernes[6],
        },
        asignatura:this.maestrosss[i].asignatura,
        nombre:this.maestrosss[i].nombre
      })
    }
    console.log(this.user);

      })




  }


  exportElmToExcel(){

  }
  exportToExcel(): void {
    let topfes = []
    for (let i = 0; i < this.maestrosss.length; i++) {

      topfes.push({
        id:this.maestrosss[i].id,
        firstName:{
          uno: this.maestrosss[i].materias.lunes[0],
          dos: this.maestrosss[i].materias.lunes[1],
          tres: this.maestrosss[i].materias.lunes[2],
          cuatro: this.maestrosss[i].materias.lunes[3],
          cinco: this.maestrosss[i].materias.lunes[4],
          seis: this.maestrosss[i].materias.lunes[5],
          siete: this.maestrosss[i].materias.lunes[6],
          unoa: this.maestrosss[i].materias.martes[0],
          dosa: this.maestrosss[i].materias.martes[1],
          tresa: this.maestrosss[i].materias.martes[2],
          cuatroa: this.maestrosss[i].materias.martes[3],
          cincoa: this.maestrosss[i].materias.martes[4],
          seisa: this.maestrosss[i].materias.martes[5],
          sietea: this.maestrosss[i].materias.martes[6],
          unob: this.maestrosss[i].materias.miercoles[0],
          dosb:  this.maestrosss[i].materias.miercoles[1],
          tresb:  this.maestrosss[i].materias.miercoles[2],
          cuatrob:  this.maestrosss[i].materias.miercoles[3] ,
          cincob:  this.maestrosss[i].materias.miercoles[4] ,
          seisb:  this.maestrosss[i].materias.miercoles[5] ,
          sieteb:  this.maestrosss[i].materias.miercoles[6],
          unoc:  this.maestrosss[i].materias.jueves[0],
          dosc: this.maestrosss[i].materias.jueves[1],
          tresc: this.maestrosss[i].materias.jueves[2],
          cuatroc: this.maestrosss[i].materias.jueves[3],
          cincoc:this.maestrosss[i].materias.jueves[4],
          seisc: this.maestrosss[i].materias.jueves[5],
          sietec: this.maestrosss[i].materias.jueves[6],
          unod: this.maestrosss[i].materias.viernes[0],
          dosd:this.maestrosss[i].materias.viernes[1],
          tresd: this.maestrosss[i].materias.viernes[2],
          cuatrod: this.maestrosss[i].materias.viernes[3],
          cincod: this.maestrosss[i].materias.viernes[4],
          seisd: this.maestrosss[i].materias.viernes[5],
          sieted: this.maestrosss[i].materias.viernes[6],
        },
        asignatura:this.maestrosss[i].asignatura,
        nombre:this.maestrosss[i].nombre
      })
    }

    console.log(this.users);
    console.log(topfes);





    const edata: Array<any> = [];
    const udt: any = {
      data: [
        { A: '',
          B: 'User Data'},
          {
            A: '',
            B: '1',
            C: '2',
            D: '3',
            E: '4',
            F: '5',
            G: '6',
            H: '7',
            I: '1',
            J: '2',
            K: '3',
            L: '4',
            M: '5',
            N: '6',
            O: '7',
            P: '1',
            Q: '2',
            R: '3',
            S: '4',
            T: '5',
            U: '6',
            V: '7',
            W: '1',
            X: '2',
            Y: '3',
            Z: '4',
            A1:'5',
            A2: '6',
            A3: '7',
            A4: '1',
            A5: '2',
            A6: '3',
            A7: '4',
            A8: '5',
            A9:'6',
            B1:'7',},
           {
          A: 'Profesor(a)',
          B: 'Lunes',
          C: '',
          D: '',
          E: '',
          F: '',
          G: '',
          H: '',
          I: 'Martes',
          J: '',
          K: '',
          L: '',
          M: '',
          N: '',
          O: '',
          P: 'Miercoles',
          Q: '',
          R: '',
          S: '',
          T: '',
          U: '',
          V: '',
          W: 'Jueves',
          X: '',
          Y: '',
          Z: '',
          A1:'',
          A2: '',
          A3: '',
          A4: 'Viernes',
          A5: '',
          A6: '',
          A7: '',
          A8: '',
          A9:'',
          B1:'',}, // table header
      ],
      skipHeader: true
    };
    topfes.forEach(user => {
      udt.data.push({
        A: user.nombre,
        B: user.firstName.uno,
        C: user.firstName.dos,
        D: user.firstName.tres,
        E: user.firstName.cuatro,
        F: user.firstName.cinco,
        G: user.firstName.seis,
        H: user.firstName.siete,
        I: user.firstName.unoa,
        J: user.firstName.dosa,
        K: user.firstName.tresa,
        L: user.firstName.cuatroa,
        M: user.firstName.cincoa,
        N: user.firstName.seisa,
        O: user.firstName.sietea,
        P: user.firstName.unob,
        Q: user.firstName.dosb,
        R: user.firstName.tresb,
        S: user.firstName.cuatrob,
        T: user.firstName.cincob,
        U: user.firstName.seisb,
        V: user.firstName.sieteb,
        W: user.firstName.unoc,
        X: user.firstName.dosc,
        Y: user.firstName.tresc,
        Z: user.firstName.cuatroc,
        A1: user.firstName.cincoc,
        A2: user.firstName.seisc,
        A3: user.firstName.sietec,
        A4: user.firstName.unod,
        A5: user.firstName.dosd,
        A6: user.firstName.tresd,
        A7: user.firstName.cuatrod,
        A8: user.firstName.cincod,
        A9: user.firstName.seisd,
        B1: user.firstName.sieted,
      });
    });
    edata.push(udt);

    // adding more data just to show "how we can keep on adding more data"
    const bd = {
      data: [
        // chart title
        { A: 'Some more data', B: '' },
        { A: '#', B: 'First Name', C: 'Last Name', D: 'Handle' }, // table header
      ],
      skipHeader: true
    };

    /*this.users.forEach(user => {
      bd.data.push({
        A: String(user.id),
        B: user.firstName,
        C: user.lastName,
        D: user.handle
      });
    });*/
    //edata.push(bd);
    this.exportService.exportJsonToExcel(edata, 'horarios');

  }

  exportToCsv(): void {
    //this.exportService.exportToCsv(this.users, 'user-data', ['id', 'firstName', 'lastName', 'handle']);
  }

  eliminarco(){
    //this.profesorService.eliminar().then(()=>{console.log("bien");
    this.profesorService.eliminar()
    //})
  }

  cargar(){
    console.log(this.mal);
  }

}
