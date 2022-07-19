import { PureComponent } from "react";
import ReactDOM from 'react-dom';
import Scenario from "./scenario";

class Panel extends PureComponent{
  constructor(props){
    super(props);
    this.state={
      css:{
        eleheight:250,
        elewidth:250,
        marginbottom:5
      },
      paneldata : {
        "scenarios":[{
          "scenarioid":"scenarioidasdfl01",
          "whys":[
          {
          "whyid":"whyid12lk3j1", 
          "question":"123",
          "answer":"xxx",
          "pid":""
          },
          {
          "whyid":"whyid12lk3jsdf", 
          "question":"123",
          "answer":"xxx" ,
          "pid":"whyid12lk3j1"
          },
          {
          "whyid":"whyid12lk3dks", 
          "question":"123",
          "answer":"xxx",
          "pid":"whyid12lk3jsdf"
          },
          {
          "whyid":"whyid12ldfdks", 
          "question":"123",
          "answer":"xxx",
          "pid":"whyid12lk3jsdf"
          },
          ],
          "rcamodel":[
            {
              "rca":{
                "rcaedarootcasuseid":"rcaasdflk0001",
                "rcaedarootcause":"rc message",
              },
              "aps":[
                { 
                "apid":"apsldf0001",
                "rcaedarootcasuseid":"rcaasdflk0001",
                "ele1":"1",
                "ele2":"12",
                "ele3":"13",
                "ele4":"14",
                "ele5":"145" 
                }
              ]
            }
          ]
        }
      ],
      "aplimit":5,
      "whylimit":5
      }
    }
  }
  render(){
    const paneldata = this.state.paneldata;
    return (
      <div className="panel">
        {
          paneldata.scenarios.map((item , index, allline)=>{
            return <Scenario key={"line"+index} scenariodata={item} css={this.state.css}/>
          })
        }
      </div>
      
    )
  }
  getRandomNum(){
    return parseInt(Math.random() * 999999999999)
  } 
}

export default Panel
