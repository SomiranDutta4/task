let boxes=document.querySelectorAll(".boxes");
let redbox=document.querySelectorAll("#redbox");
let greenbox=document.querySelectorAll("#greenbox");
let buttons=document.querySelectorAll(".boxbutton");
let subjectname=document.querySelectorAll(".subjectname");
let enterbut=document.querySelector("#enterbut");
let dayow=document.querySelector("#dayow");
let attendedClass=document.querySelector("#attended");
let attClasses=document.querySelector("#presentees");
let abbClasses=document.querySelector("#absentees");

for(let i=0;i<3;i++){
    subjectname[i].value="";
    greenbox[i].disabled=true;
    redbox[i].disabled=true;
}
//the red and green buttons won't work unless a valid day is entered,(eg. monday, tuesday,...etc)
//they are disabled if site is opened for first time or refreshed to remove confusions
let attendance=[
    "none","none","none",
    "none","none","none",
    "none","none","none",
    "none","none","none",
    "none","none","none",
];
//used to store the present and absent data in this array
let days=["monday","tuesday","wednesday","thursday","friday"];
//these are the allowed days in the input
let classes=[
    "Computing","Biology","Eng. Mechanics",
    "Biology","MA-102","eng. Mechanics",
    "MA-102","Eng. Mechanics","PH-102",
    "Eng. Mechanics","PH-102","Biology",
    "Computing","Biology","No Class"
];
//these are subjects according to the respective days (everyday we have 3 classes)

redbox.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        greenbox[index].style.backgroundColor="rgb(228, 50, 50)";
        boxes[index].style.backgroundColor="rgb(228, 50, 50)";
        subjectname[index].style.backgroundColor="rgb(228, 50, 50)";
        buttons[index*2].innerText="";
        buttons[index*2+1].innerText="";
        for(let i=0;i<5;i++){
            if(dayow.value==days[i]){
                attendance[index+3*i]="absent";
            };
        };
        //on clicking the red button of a specific class of a specific day it stores as absent in the attendance array in the corresponding index
        redbox[index].disabled=true;
        greenbox[index].disabled=true;
    });
});
//on clicking any red button, the whole box turn red
greenbox.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        redbox[index].style.backgroundColor="springgreen";
        boxes[index].style.backgroundColor="springgreen";
        subjectname[index].style.backgroundColor="springgreen";
        buttons[index*2].innerText="";
        buttons[index*2+1].innerText="";
        for(let i=0;i<5;i++){
            if(dayow.value==days[i]){
                attendance[index+3*i]="present";
            };
        }
        //on clicking the red button of a specific class of a specific day it stores as present in the attendance array in the corresponding index
        redbox[index].disabled=true;
        greenbox[index].disabled=true;
    });
});
//on clicking the green button of a box, the whole box turns green
enterbut.addEventListener("click",()=>{
    let num=0;
    //num is the number of days the value of the input is matched with the days of a week
    //it can be 1 or 0 at the end of the loop
    for(let i=0;i<5;i++){
        //5 represents the 5 days of week
        if(days[i]==dayow.value){
            num++;
            //num will be 1 if a valid day is entered in input
            //after giving a day as input, it checks if it matches with any day of the days array,
            for(let j=0;j<3;j++){
                //it now uses the data stored in the attendances array
                subjectname[j].value=classes[i*3+j];
                if(attendance[i*3+j]=="present"){
                    greenbox[j].style.backgroundColor="springgreen";
                    redbox[j].style.backgroundColor="springgreen";
                    boxes[j].style.backgroundColor="springgreen";
                    subjectname[j].style.backgroundColor="springgreen";
                    buttons[j*2].innerText="";
                    buttons[j*2+1].innerText="";
                    //if a class of a day is already marked as present(the corresponding index of attendance array was then changed to "present" ),it shows the box as already green without pressing green button
                };
                if(attendance[i*3+j]=="absent"){
                    redbox[j].style.backgroundColor="rgb(228, 50, 50)"
                    greenbox[j].style.backgroundColor="rgb(228, 50, 50)";
                    boxes[j].style.backgroundColor="rgb(228, 50, 50)";
                    subjectname[j].style.backgroundColor="rgb(228, 50, 50)";
                    buttons[j*2].innerText="";
                    buttons[j*2+1].innerText="";
                    //if a class of a day is already marked as absent(the corresponding index of attendance array was then changed to "absent" ),it shows the box as already red without pressing red button
                };
                if(attendance[i*3+j]=="none"){
                    redbox[j].style.backgroundColor="rgb(228, 50, 50)";
                    greenbox[j].style.backgroundColor="springgreen";
                    subjectname[j].style.backgroundColor="antiquewhite";
                    boxes[j].style.backgroundColor="antiquewhite";
                    buttons[j*2].innerText='\u2714';
                    buttons[j*2+1].innerText='\u2716';
                    greenbox[j].disabled=false;
                    redbox[j].disabled=false;
                    //if a class of a day is not marked as present(the corresponding index of attendance was "none" ),it shows the box as the default color 
                };
                if(attendance[i*3+j]=="No Class"){
                    greenbox[j].disabled=true;
                    redbox[j].disabled=true;
                    //if no class is displayed,the red and green button is disabled(since no use of the data then)
                };
            }
        };
        };
    if(num==0){
        for(let j=0;j<3;j++){
            //if the input is not a valid day of a week, the color of the boxes is turned to default color aas it was before and the buttons are disabled to remove confusions
            redbox[j].style.backgroundColor="rgb(228, 50, 50)";
            greenbox[j].style.backgroundColor="springgreen";
            subjectname[j].style.backgroundColor="antiquewhite";
            boxes[j].style.backgroundColor="antiquewhite";
            buttons[j*2].innerText='\u2714';
            buttons[j*2+1].innerText='\u2716';
            subjectname[j].value="";
            greenbox[j].disabled=true;
            redbox[j].disabled=true;
        }
    };
    });
    attendedClass.addEventListener("click",()=>{
        let presents=0;
        let classmarked=0;
        for(let i=0;i<14;i++){
             //this loop is used to calculate the number of classes attended out of the total classes
            if(attendance[i]=="present"){
                presents++;
                classmarked++;
            }if(attendance[i]=="absent"){
                classmarked++;
            }
        }
        attClasses.value=presents ;
        abbClasses.value=classmarked;
    })