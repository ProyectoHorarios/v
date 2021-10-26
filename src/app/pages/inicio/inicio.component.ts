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
  constructor( private exportService: ExportService,
               private profesorService:ProfesorService) { }

  async ngOnInit(){
    localStorage.removeItem('ruta');
    localStorage.setItem('ruta', '/inicio');


    this.users = [
      {
        id: "Hernández Castillo Evelyn",
        firstName: {
          uno: "TB3",
          dos: "SE",
          tres: "3C",
          cuatro: "3D",
          cinco: "SE",
          seis: "3B",
          siete: "3A",
          unoa: "3D",
          dosa: "3B",
          tresa: "SE",
          cuatroa: "3D",
          cincoa: "3A",
          seisa: "NULL",
          sietea: "NULL",
          unob: "3C",
          dosb: "3A",
          tresb: "3D",
          cuatrob: "3B",
          cincob: "NULL",
          seisb: "NULL",
          sieteb: "NULL",
          unoc: "NULL",
          dosc: "NULL",
          tresc: "3A",
          cuatroc: "3B",
          cincoc: "SE",
          seisc: "3C",
          sietec: "3D",
          unod: "3D",
          dosd: "3B",
          tresd: "3A",
          cuatrod: "3C",
          cincod: "NULL",
          seisd: "NULL",
          sieted: "NULL",
          },
        lastName: {
          uno: "1",
          dos: "2"
          },
        handle: {
          uno: "1",
          dos: "2"
          }
      },
      {
        id: "Mauricio Durán Cecilia Guadalupe",
        firstName: {
          uno: "NULL",
          dos: "1A",
          tres: "SE",
          cuatro: "1B",
          cinco: "2D",
          seis: "SE",
          siete: "NULL",
          unoa: "2D",
          dosa: "SE",
          tresa: "1A",
          cuatroa: "SE",
          cincoa: "1B",
          seisa: "NULL",
          sietea: "NULL",
          unob: "NULL",
          dosb: "NULL",
          tresb: "NULL",
          cuatrob: "1B",
          cincob: "SE",
          seisb: "1A",
          sieteb: "2D",
          unoc: "NULL",
          dosc: "NULL",
          tresc: "NULL",
          cuatroc: "2D",
          cincoc: "SE",
          seisc: "1B",
          sietec: "1A",
          unod: "NULL",
          dosd: "NULL",
          tresd: "NULL",
          cuatrod: "1B",
          cincod: "1A",
          seisd: "2D",
          sieted: "T1B",
          },
        lastName: {
          uno: "1",
          dos: "2"
          },
        handle: {
          uno: "1",
          dos: "2"
          }
      },
      {
        id: "Carlos Espinosa Dan",
        firstName: {
          uno: "NULL",
          dos: "1A",
          tres: "SE",
          cuatro: "1B",
          cinco: "2D",
          seis: "SE",
          siete: "NULL",
          unoa: "2D",
          dosa: "SE",
          tresa: "1A",
          cuatroa: "SE",
          cincoa: "1B",
          seisa: "NULL",
          sietea: "NULL",
          unob: "NULL",
          dosb: "NULL",
          tresb: "NULL",
          cuatrob: "1B",
          cincob: "SE",
          seisb: "1A",
          sieteb: "2D",
          unoc: "NULL",
          dosc: "NULL",
          tresc: "NULL",
          cuatroc: "2D",
          cincoc: "SE",
          seisc: "1B",
          sietec: "1A",
          unod: "NULL",
          dosd: "NULL",
          tresd: "NULL",
          cuatrod: "1B",
          cincod: "1A",
          seisd: "2D",
          sieted: "T1B",
          },
        lastName: {
          uno: "1",
          dos: "2"
          },
        handle: {
          uno: "1",
          dos: "2"
          }
      }
    ];

  }

  exportElmToExcel(){

  }
  exportToExcel(): void {

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
    this.users.forEach(user => {
      udt.data.push({
        A: user.id,
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
    this.exportService.exportJsonToExcel(edata, 'user_data_customized');
  }

  exportToCsv(): void {
    //this.exportService.exportToCsv(this.users, 'user-data', ['id', 'firstName', 'lastName', 'handle']);
  }

  eliminarco(){
    //this.profesorService.eliminar().then(()=>{console.log("bien");
    this.profesorService.eliminar()
    //})
  }

}
