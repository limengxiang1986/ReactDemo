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
          "why":
          {
          "whyid":"whyid0001", 
          "question":"123",
          "answer":"1",
          "pid":"",
          "subwhys":[
            {
              "whyid":"whyid0002", 
              "question":"123",
              "answer":"2" ,
              "pid":"whyid0001",
              "subwhys":[
                {
                  "whyid":"whyid0003", 
                  "question":"123",
                  "answer":"3" ,
                  "pid":"whyid0002",
                  "subwhys":[
                    
                  ]
                },
                {
                  "whyid":"whyid0004", 
                  "question":"123",
                  "answer":"4" ,
                  "pid":"whyid0002",
                  "subwhys":[
                    {
                      "whyid":"whyid0007", 
                      "question":"123",
                      "answer":"7" ,
                      "pid":"whyid0004",
                      "subwhys":[
                        
                      ]
                    },
                  ]
                },
              ]
            },
            {
              "whyid":"whyid0005", 
              "question":"123",
              "answer":"5" ,
              "pid":"whyid0001",
              "subwhys":[
                {
                  "whyid":"whyid0006", 
                  "question":"123",
                  "answer":"6" ,
                  "pid":"whyid0005",
                  "subwhys":[
                    
                  ]
                }
              ]
            },
          ]
          }
      }],
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
            return <Scenario key={"sce"+this.getRandomNum()} scenariodata={item} css={this.state.css} getRandomNum={this.getRandomNum}/>
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
