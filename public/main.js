//variables
const recommendeds=document.querySelector('#recommended').getElementsByClassName('gallery-cell')

const url='http://localhost:3000/books/get'
const renderImages=(url)=>{
    fetch(url).then((res)=>{
        if(res.ok){
           return res.json()
        }
        else{
            throw new Error(res.status)
        }
    }).then((jsonObj)=>{
       const recommendedsBookUrl=jsonObj.filter(img=>img.recommended) 
       console.log(recommendedsBookUrl)
       for(let i=1;i<recommendeds.length && i<recommendedsBookUrl.length ;i++){
             recommendeds[i].style.backgroundImage=`url(${recommendedsBookUrl[i].imageUrl})`
       }
    })
    
}

renderImages(url)