document.querySelector('.savebutton').style.display= 'none';


let Notesfromnotepad = []

function renderElement(){
    if(localStorage.getItem('Notesfromnotepad')) {
        Notesfromnotepad = JSON.parse(localStorage.getItem('Notesfromnotepad'))
        Notesfromnotepad.forEach(note => {
            createanewnote(note.title,note.p,note.uniqueclass)
        })
    }
}


document.querySelector('.submitbutton').addEventListener('click',()=>{
    let title = document.querySelector('#Title').value;
    let p = document.querySelector('#textarea').value;
    if(title.trim()==='' || p.trim()===''){
        alert('Please Fill All Details')
    }
    let UniqueNumber = Math.floor(Math.random()*100000);
    UniqueClass = 'note' + UniqueNumber;
    Storeit(title,p,UniqueClass)
    createanewnote(title,p,UniqueClass)
})

function createanewnote(title,p,UniqueClass){

    console.log(UniqueClass)
    let note = document.querySelector('.note');
    let notehead = document.createElement('div');
    notehead.classList.add('notehead',UniqueClass)
    let notetitle = document.createElement('h2');
    notetitle.className = 'TitleName';
    notetitle.innerHTML = title;
    // let editbutton = document.createElement('button');
    // editbutton.innerHTML = 'Edit';
    let description = document.createElement('div');
    description.className = 'description';
    let matterofnote = document.createElement('p');
    matterofnote.innerHTML = p.replace(/\n/g, '<br>');
    matterofnote.id = 'noteContent';
    // editbutton.addEventListener('click',() => {
    //     let ID = document.querySelector('.'+UniqueClass)
    //     let editcontent = ID.querySelector('#noteContent').innerHTML;
    //     let edittitle = ID.querySelector('.TitleName').innerHTML;
    //     editFunction(ID,edittitle,editcontent)
    // })

    let deletebutton = document.createElement('button');
    deletebutton.innerHTML = 'Delete';
    deletebutton.style.backgroundColor = 'tomato';
    deletebutton.style.cursor = 'pointer';
    deletebutton.addEventListener('click',() => {
        // console.log(`${UniqueClass}`)
         deletefunction(UniqueClass)
    })

    description.appendChild(matterofnote);
    description.appendChild(deletebutton);
    notehead.appendChild(notetitle);
    // notehead.appendChild(editbutton);
    notehead.appendChild(description);
    note.appendChild(notehead);
    document.querySelector('#Title').value = '';
    document.querySelector('#textarea').value = '';

}

function deletefunction(UniqueClass){
    document.querySelector('.'+ UniqueClass).remove();
    Notesfromnotepad = JSON.parse(localStorage.getItem('Notesfromnotepad'))
    let index = Notesfromnotepad.findIndex(note => note.uniqueclass == UniqueClass)
    Notesfromnotepad.splice(index, 1)
    localStorage.setItem('Notesfromnotepad',JSON.stringify(Notesfromnotepad))
}

function Storeit(title,p,UniqueClass){
    let note={
        title:title,
        p:p,
        uniqueclass : UniqueClass,
    }
    Notesfromnotepad.push(note)
    localStorage.setItem('Notesfromnotepad',JSON.stringify(Notesfromnotepad))
}

renderElement()
// function deletefunction(UniqueClass){
//     document.querySelector('.'+UniqueClass).remove()
// }

function editFunction(UniqueClass,notetitle,matterofnote){
    console.log(UniqueClass,notetitle,matterofnote)
    document.querySelector('#Title').value = notetitle;
    document.querySelector('#textarea').value = matterofnote;
    document.querySelector('.submitbutton').style.display= 'none';
    document.querySelector('.savebutton').style.display= 'block';
    // Savenote() 
}


document.querySelector('.savebutton').addEventListener('click',()=>{
    console.log('save')
    let savetitle = document.querySelector('#Title').value;
    let savetextarea = document.querySelector('#textarea').value;
    console.log(savetitle,savetextarea)
    document.querySelector('.submitbutton').style.display= 'block';
    document.querySelector('.savebutton').style.display= 'none';
})

// function Savenote(){
//     // let textareacontent = document.querySelector('#textarea').value;
//     // document.querySelector('#notecontent').innerHTML = textareacontent;
//     document.querySelector('.savebutton').style.display = 'none';
//     document.querySelector('.submitbutton').style.display = 'block';
// }

document.addEventListener('DOMContentLoaded',function(){
    document.querySelector('.Deleteallnotes').addEventListener('click',()=>{
        document.querySelectorAll('.notehead').forEach( note => {
            note.remove()
        })
        localStorage.clear()
    })
})

// function DeleteAll(){
//     document.querySelector('.Deleteallnotes').addEventListener('click',()=>{
//                 document.querySelectorAll('.notehead').forEach( note => {
//                     note.remove()
//                 })
//                 localStorage.clear()
//             })
// }