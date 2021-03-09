//elements
const recommendedsContainer =document.querySelector('#recommendeds')
const salesContainer =document.querySelector('#sales')
const newBooksContainer =document.querySelector('#new-books')
const footer=document.querySelector('#footer')
const footerDafdef=footer.getElementsByClassName('footer-daf-def')[0]
const footerGenres=footer.getElementsByClassName('footer-genres')[0]
const footerSales=footer.getElementsByClassName('footer-sales')[0]
const login=footerDafdef.children[1]

const modalBackground=document.getElementsByClassName('modal')
const loginModal=document.querySelector('#login-modal')
const loginForm=loginModal.getElementsByTagName('form')[0]
const signupModal=document.querySelector('#signup-modal')



//requires


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
       const recommendedsBooksUrl=jsonObj.filter(img=>img.recommended).map(img=>img.imageUrl)
       const recommendedsBooks=recommendedsContainer.getElementsByClassName('gallery-cell')

       const salesBooksUrl=jsonObj.filter(img=>img.sale).map(img=>img.imageUrl)
       const salesBooks=salesContainer.getElementsByClassName('gallery-cell')

       const newBooksUrl=jsonObj.filter(img=>img.new).map(img=>img.imageUrl)
       const newBooks=newBooksContainer.getElementsByClassName('gallery-cell')


       for(let i=0;i<recommendedsBooks.length;i++){
           recommendedsBooks[i].style.backgroundImage=`url(${recommendedsBooksUrl[i]})`
           salesBooks[i].style.backgroundImage=`url(${salesBooksUrl[i]})`
           newBooks[i].style.backgroundImage=`url(${newBooksUrl[i]})`
       }
    
    })
    
}


const openLoginModal=()=>{
    loginModal.classList.remove('display-none')
}

const closeLoginModal=()=>{
    loginModal.classList.add('display-none')
}


console.log(modalBackground[0])
login.addEventListener('click',openLoginModal)
window.onclick = (event)=> {
    console.log(event.target)
    if (event.target === loginModal)
        closeLoginModal()
  }


const signUpUser=(userData)=>{
    alert('Sign up')
    const data=userData

   fetch('http://localhost:3000/users/add', {
       method: 'POST', 
       headers: {
          'Content-Type': 'application/json',
       },
       body: JSON.stringify(data),
       })
       .then((res)=>
          console.log(res))
}

const logout=()=>{

}


renderImages(url)
