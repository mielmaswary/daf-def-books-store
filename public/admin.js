///////////////////elements///////////////////////

// const { eventNames } = require("../src/models/bookModel")

// const User = require("../src/models/userModel")
openLoginModal()
//header
const utilsContainer=document.getElementsByClassName('utils-container')[0]
const headerLoginBtn=utilsContainer.getElementsByClassName('fa-user')[0]
const headerCartBtn=utilsContainer.getElementsByClassName('fa-shopping-cart')[0]
const headerMenuBtn=utilsContainer.getElementsByClassName('fa-bars')[0]
const mainSearchForm=document.getElementsByClassName('search-book')[0]
const userLoggedinTools=document.getElementsByClassName('user-loggedin-tools')[0]
const headerUserName=userLoggedinTools.getElementsByClassName('user-name')[0]
const headerLogoutBtn=userLoggedinTools.getElementsByClassName('user-logout')[0]


// const recommendedsContainer =document.querySelector('#recommendeds')
// const salesContainer =document.querySelector('#sales')
// const newBooksContainer =document.querySelector('#new-books')
// const footer=document.querySelector('#footer')
// const footerDafdef=footer.getElementsByClassName('footer-daf-def')[0]
// const footerGenres=footer.getElementsByClassName('footer-genres')[0]
// const footerSales=footer.getElementsByClassName('footer-sales')[0]

//login modals
const modalBackground=document.getElementsByClassName('modal')[0]
const signupForm=modalBackground.children[0]
const loginForm=modalBackground.children[1]
const switchToSignUpBtn=document.querySelector('#switch-to-signup')
const switchToLoginBtn=document.querySelector('#switch-to-login')
const loginFormBtn=loginForm.getElementsByTagName('button')[0]
const signupFormBtn=signupForm.getElementsByTagName('button')[0]
const loginErrorMsg=document.getElementById('login-error-msg')
const signUpErrorMsg=document.getElementById('sign-error-msg')
let token=''
const mustLoggedInModal=document.getElementById('mustLoggedInModal')
const mustLoggedInButton=document.getElementById('mustLoggedInButton')

//books info modals
// const booksInfoModal=document.getElementsByClassName('modal')[2]
// const booksInfoBookName=document.getElementsByClassName('book-name')[0]
// const booksInfoAuthorName=document.getElementsByClassName('author-name')[0]
// const booksInfoBookImg=document.getElementsByClassName('info-img')[0]
// const booksInfoBookPrice=document.getElementsByClassName('info-price')[0]
// const booksInfoBookSummery=document.getElementsByClassName('summery')[0].querySelectorAll('p')[0]
// const booksInfoBookPages=document.getElementsByClassName('summery')[0].querySelectorAll('p')[1]
// const booksInfoBookGenre=document.getElementsByClassName('summery')[0].querySelectorAll('p')[2]
const books=document.getElementsByClassName('gallery-cell')


//books search modals
const halfModal=document.getElementsByClassName('half-modal')[0]
const booksSearchModal=halfModal.getElementsByClassName('books-search-modal')[0]
const searchedBooksContainer=document.querySelector('#searched-books-container');
const booksSearchTitle=halfModal.getElementsByClassName('section-title')[0]


//cart

// const purchasedBooksContainer=document.getElementsByClassName('purchased-books-container')[0]
// const payBill=document.getElementsByClassName('pay-bill')[0]

///////////////////server functions////////////////////

// const renderImages=()=>{
//     const url='http://localhost:3000/books/get-all'

//     fetch(url).then((res)=>{
//         if(res.ok){
//            return res.json()
//         }
//         else{
//             throw new Error(res.status)
//         }
//     }).then((jsonObj)=>{
//        const recommendedsBooksUrl=jsonObj.filter(img=>img.recommended).map(img=>img.imageUrl)
//        const recommendedsBooksId=jsonObj.filter(img=>img.recommended).map(img=>img._id)
//        const recommendedsBooks=recommendedsContainer.getElementsByClassName('gallery-cell')

//        const salesBooksUrl=jsonObj.filter(img=>img.sale).map(img=>img.imageUrl)
//        const salesBooksId=jsonObj.filter(img=>img.sale).map(img=>img._id)
//        const salesBooks=salesContainer.getElementsByClassName('gallery-cell')

//        const newBooksUrl=jsonObj.filter(img=>img.new).map(img=>img.imageUrl)
//        const newBooksId=jsonObj.filter(img=>img.new).map(img=>img._id)
//        const newBooks=newBooksContainer.getElementsByClassName('gallery-cell')


//        for(let i=0;i<recommendedsBooks.length;i++){
//            recommendedsBooks[i].style.backgroundImage=`url(${recommendedsBooksUrl[i]})`
//            recommendedsBooks[i].id=recommendedsBooksId[i]
//            salesBooks[i].style.backgroundImage=`url(${salesBooksUrl[i]})`
//            salesBooks[i].id=salesBooksId[i]
//            newBooks[i].style.backgroundImage=`url(${newBooksUrl[i]})`
//            newBooks[i].id=newBooksId[i]
//        }
//     })  
// }

// const renderBookInfo=(book)=>{
//     console.log(book.id)
//     localStorage.setItem('bookId',book.id)
//      const url=`http://localhost:3000/books/get/${book.id}`
   
//      fetch(url).then((res)=>{
//         if(res.ok){
//            return res.json()
//         }
//         else{
//             throw new Error(res.status)
//         }
//     }).then((jsonObj)=>{
//         booksInfoBookImg.style.backgroundImage=`url(${jsonObj.imageUrl})`;
//         booksInfoBookName.innerHTML=jsonObj.bookName;
//         booksInfoAuthorName.innerHTML=jsonObj.authorName;
//         booksInfoBookPrice.innerHTML=`ספר דיגיטלי: ${jsonObj.price} ש"ח`;
//         booksInfoBookPages.innerHTML= `מספר עמודים: ${jsonObj.pagesNum} `;
//         booksInfoBookGenre.innerHTML=`ז'אנר: ${jsonObj.genres} `;
//     })
// }


///////////////////////////////////////////general/////////////////////////////////////////////////////

//elements
const msgModal=document.getElementById('msg-modal')
const header=document.getElementsByClassName('header')[0]
const chooseOptions=document.getElementsByClassName('choose-options')[0]

//functions
const openMsgModal=(msg)=>{
    msgModal.classList.remove("display-none")
    msgModal.children[0].innerHTML=msg
}
///////////////////////////////////////////add book////////////////////////////////////////////////////

//elements
const addBookBtn=document.getElementById('book-add-btn')
const addBookPanelContainer=document.getElementById('book-add-panel-container')

//events
addBookBtn.addEventListener('click',()=>{
    mainSearchForm.classList.add('display-none')
    openAddBookPanel()
    closeEditBookPanel()
})


//functions
const openAddBookPanel=()=>{
    addBookPanelContainer.classList.remove('display-none')
}

const closeAddBookPanel=()=>{
    addBookPanelContainer.classList.add('display-none')
}


///////////////////////////////////////////edit book////////////////////////////////////////////////////

//elements
const editBookBtn=document.getElementById('book-edit-btn')
const editBookPanelContainer=document.getElementById('book-edit-panel-container')
const editBookPanel=document.getElementsByClassName('book-panel')[0]

//events
editBookBtn.addEventListener('click',()=>{
    openMainSearchForm()
    closeAddBookPanel()
    mainSearchForm.value=''

})
editBookPanel.addEventListener('submit',(event)=>{
    event.preventDefault()
    const bookData=createObjData(event.target)
    updateBookDetailes(bookData,localStorage.getItem('edit-book-id'))
    openMsgModal('מצויין:)<br> כל הפרטים עודכנו!')
    setTimeout(()=>{
        location.reload();
    },1000)
    localStorage.removeItem('edit-book-id');


})


//functions
const openMainSearchForm=()=>{
    mainSearchForm.classList.remove('display-none')
}
const openEditBookPanel=(bookId)=>{
    editBookPanelContainer.classList.remove('display-none')
    restartInputValues()
    renderBookDetails(bookId)
}
const restartInputValues=()=>{
    for (let child of editBookPanel.children){
        if(child.childElementCount>0 && child.children[1].tagName==='INPUT')
            child.children[1].value=''
     }
}

const closeEditBookPanel=()=>{
    editBookPanelContainer.classList.add('display-none')
}

const createObjData =(form)=>{
    const objData ={
        bookName:form[0].value,
        authorName: form[1].value,
        genres:form[2].value,
        pagesNum:form[3].value,
        imageUrl:form[4].value,
        price:form[5].value
    }
    for (let field in objData ){
        if(objData[field]==="")
           delete objData[field]
    }

    return objData
}

const modalMsg=(msg)=>{
    
}
//fatch functions
const renderBooksImagesBySearch=(searchValue)=>{
    const url=`http://localhost:3000/books/${searchValue}`

    fetch(url).then((res)=>{
        if(res.ok){
           return res.json()
        }
        else{
            throw new Error(res.status)
        }
    }).then((jsonObj)=>{
       const seachedBooksUrl=jsonObj.map(img=>img.imageUrl)
       const searchedBooksId=jsonObj.map(img=>img._id)
       booksSearchTitle.innerHTML=seachedBooksUrl.length>0?'הנה ספרים שמתאימים לחיפוש שלך...':'לא מצאנו ספרים שמתאימים לחיפוש שלך...'
       while(searchedBooksContainer.children.length>0){
           searchedBooksContainer.removeChild(searchedBooksContainer.lastChild)
        }
       for(let i=0;i<seachedBooksUrl.length;i++){
           const galleryCell=document.createElement('div')
           galleryCell.className='book'
           searchedBooksContainer.appendChild(galleryCell)
           galleryCell.style.backgroundImage=`url(${seachedBooksUrl[i]})`
           galleryCell.id=searchedBooksId[i]
           galleryCell.addEventListener('click', ()=>{
               openEditBookPanel(galleryCell.id)
               localStorage.setItem('edit-book-id',galleryCell.id)
               closeAddBookPanel()
           }) 
       }
    })  
}


const renderBookDetails=(bookId)=>{
    token=localStorage.getItem('token')
    const options={
        method: 'GET', 
        headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
        }
    }
    fetch(`http://localhost:3000/books/get/${bookId}`,options)
    .then(res=>res.json())
    .then(book=>{
        console.log(book)
        currentBookName.innerHTML=book.bookName
        currentAuthorName.innerHTML=book.authorName
        currentGenre.innerHTML=book.genres
        currentPages.innerHTML=book.pagesNum
        // currentImg.innerHTML=book.imageUrl
        currentPrice.innerHTML=book.price
        
    }).catch(err=>{
        console.log(err)
    })
}

const updateBookDetailes=(bookData,bookId)=>{
    token=localStorage.getItem('token')
    const url=`http://localhost:3000/books/edit/${bookId}`
    const options={
        method: 'PATCH', 
        headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookData)
    }
    fetch(url,options)
}

///////////////////////////////////////////////////

const renderBooksImagesById=()=>{
    token=localStorage.getItem('token')
    const options={
        method: 'GET', 
        headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
        }
    }
    fetch(`http://localhost:3000/books/get-by-id`,options)
    .then(res=>res.json())
    .then(books=>{
        let totalPay=0
        const booksImgUrl=books.map(book=>book.imageUrl)
        while(purchasedBooksContainer.children.length>0){
            purchasedBooksContainer.removeChild(purchasedBooksContainer.lastChild)
         }
        for(let i=0;i<booksImgUrl.length;i++){
            const galleryCell=document.createElement('div')
            galleryCell.className='book'
            purchasedBooksContainer.appendChild(galleryCell)
            galleryCell.style.backgroundImage=`url(${booksImgUrl[i]})`
            galleryCell.id=books[i]._id
            const removeBtn=document.createElement('div')
            removeBtn.className='fas fa-times remove-book-btn'
            removeBtn.addEventListener('click',()=>{
               removeBookFromCart(removeBtn.parentElement.id)
            })
            galleryCell.appendChild(removeBtn)
            galleryCell.classList.add('position-relative')
            // galleryCell.id=searchedBooksId[i] 
            totalPay+=books[0].price
        }
        purchasedBooksCounter.innerHTML=booksImgUrl.length
        if(booksImgUrl.length===0)
            purchasedBooksCounter.classList.add('display-none')
        payBill.innerHTML=`סכום כולל לתשלום: ${totalPay} ש"ח`

    }).catch(err=>{
        console.log(err)
    })
}



const addUserToDB=(userData)=>{

   fetch('http://localhost:3000/users/add', {
       method: 'POST', 
       headers: {
          'Content-Type': 'application/json',
       },
       body: JSON.stringify(userData),
       })
       .then(response => response.json())
       .then(data=>{
           console.log(data.user.email,data.user.password)
           swichToLogin()
       })
       .catch((err)=>{
           alert(err)
       })
      
}

const loginUser= async (userLoginData)=>{
    const userData=userLoginData
    const options={
        method: 'POST', 
        headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    }
   fetch('http://localhost:3000/users/login',options)
   .then(response => response.json())
   .then(data => {
    if(data.user){
        // headerUserName.innerHTML=`שלום, ${data.user.name}`
        // headerLogoutBtn.innerHTML='התנתקות'
        // userLoggedinTools.classList.remove('display-none')
        // payBill.classList.remove('display-none')
        // purchasedBooksCounter.innerHTML=data.user.purchasedBooks.length
        // purchasedBooksCounter.innerHTML=data.user.purchasedBooks.length
        // if(data.user.purchasedBooks.length>0)
        //    purchasedBooksCounter.classList.remove('display-none')
        chooseOptions.classList.remove('display-none')
        header.classList.remove('display-none')
        token= localStorage.setItem('token',data.token)

        console.log(data)
        closeModal()
    }
    else{
        showLoginErrorMsg('נראה שלא הצלחת להתחבר...<br> אולי הסיסמא או המייל לא נכונים?')
     }
   })
   
}
const logout=()=>{
    token=localStorage.getItem('token')
    const options={
        method: 'POST', 
        headers: {
           'Authorization': `Bearer ${token}`
        }
    }
   fetch('http://localhost:3000/users/logout',options)
   .then(response => response.json())
   .then(data => {
       userLoggedinTools.classList.add('display-none')
       purchasedBooksCounter.classList.add('display-none')
       console.log(data)

    }).catch(error=>{
        console.log(error)
    })
}

const logoutAll=()=>{
    token=localStorage.getItem('token')
    const options={
        method: 'POST', 
        headers: {
           'Authorization': `Bearer ${token}`
        }
    }
   fetch('http://localhost:3000/users/logoutAll',options)
   .then(response => response.json())
   .then(data => {
       userLoggedinTools.classList.add('display-none')
       purchasedBooksCounter.classList.add('display-none')
       console.log(data)

    }).catch(error=>{
        console.log(error)
    })
}

////////////////////client functions//////////////////////

const closeModal=()=>{
    closeLoginModal()
    closeSignupModal()
    // closeBooksModal()

    refreshFormsInputs()
}

const refreshFormsInputs =()=>{
    for (let form of modalBackground.children){
        for(let child of form){
          child.value=''
        }
    }
}
const openLoginModal=()=>{
    modalBackground.classList.remove('display-none')
    loginErrorMsg.classList.add('display-none')
    signUpErrorMsg.classList.add('display-none')
    if(!window.matchMedia("(max-width: 800px)").matches)
        loginForm.style.transform='translateX(60%)'
    loginForm.classList.remove('display-none')
}

const closeLoginModal=()=>{
    modalBackground.classList.add('display-none')
    if(!window.matchMedia("(max-width: 800px)").matches)
        loginForm.style.transform='translateX(-60%)'
    loginForm.classList.add('display-none')
}

const openSignupModal=()=>{
    modalBackground.classList.remove('display-none')
    if(!window.matchMedia("(max-width: 800px)").matches)
        signupForm.style.transform='translateX(-50%)'
    signupForm.classList.remove('display-none')
}
const closeSignupModal=()=>{
    modalBackground.classList.add('display-none')
    if(!window.matchMedia("(max-width: 800px)").matches)
        signupForm.style.transform='translateX(50%)'
    signupForm.classList.add('display-none')
   
}
// const closeBooksModal=()=>{
//     booksInfoModal.classList.add('display-none')
// }

const openLoginForm=()=>{
    if(!window.matchMedia("(max-width: 800px)").matches)
         loginForm.style.transform='translateX(60%)'
    loginForm.classList.remove('display-none')
    loginErrorMsg.classList.add('display-none')
}
const closeLoginForm=()=>{
    if(!window.matchMedia("(max-width: 800px)").matches)
         loginForm.style.transform='translateX(-60%)'
    loginForm.classList.add('display-none')
}
const openSignupForm=()=>{
    if(!window.matchMedia("(max-width: 800px)").matches)
         signupForm.style.transform='translateX(-50%)'
    signupForm.classList.remove('display-none')
    signUpErrorMsg.classList.add('display-none')

}
const closeSignupForm=()=>{
    if(!window.matchMedia("(max-width: 800px)").matches)
         signupForm.style.transform='translateX(50%)'
    signupForm.classList.add('display-none')
}

const swichToLogin=()=>{
    openLoginForm()
    closeSignupForm()
}
const swichToSignup=()=>{
    openSignupForm()
    closeLoginForm()
}



const isValidAge=(age)=>{
    return age>12&&age!=''
}
const isValidEmail =(email)=>{
   return true
}
const isValidPassword=(password)=>{
    return true
}

const isValidForm=(form)=>{
    if(form.email&&form.password){
        return  isValidEmail(form.email.value)&&isValidPassword(form.password.value)
    }
    else{
        return false
    }
   
}

const closeSearchBooksModal=()=>{
    halfModal.classList.add('display-none')
}

const showLoginErrorMsg=(msg)=>{
   loginErrorMsg.innerHTML=msg
   loginErrorMsg.classList.remove('display-none')
}

// const rslides=()=>{
//     let slides=document.getElementsByClassName('rslides')[0]
//     slides.responsiveSlides()
//  }
//  rslides()

// //  $(function() {
// //     $(".rslides").responsiveSlides();
// //   });



//////////////////eventListeners//////////////////

//mainSearchForm.addEventListener('click',()=>{
   
// })
mainSearchForm.classList.add('display-none')
mainSearchForm.addEventListener("keyup",(event)=>{
    let searchValue=mainSearchForm.value.trim()
    if(searchValue!=='' && event.key!=='Backspace')
        halfModal.classList.remove('display-none')
    else
        searchValue='emptyValue'
    renderBooksImagesBySearch(searchValue)
})

window.addEventListener('scroll',()=>{
    if(!window.matchMedia("(max-width: 500px)").matches){
        // halfModal.classList.add('display-none')
        // mainSearchForm.value=''
    }
  
})


switchToSignUpBtn.addEventListener('click', swichToSignup)
switchToLoginBtn.addEventListener('click',swichToLogin)


headerLoginBtn.addEventListener('click',openLoginModal)
headerLogoutBtn.addEventListener('click',logout)

window.addEventListener('click' ,(event)=> {
    if (event.target===modalBackground||event.target.className==="fas fa-times")
        closeModal()
        closeSearchBooksModal()
  })

loginForm.addEventListener('submit',(event)=>{
    event.getPreventDefault
    
})

//mouseover and keyup
const events=['mouseover','keyup']
for (let event of events){
    for (let form of modalBackground.children){
        form.addEventListener(event,()=>{
            if(isValidForm(form)){
                form.querySelector('button').classList.remove('disableSubmit')
                form.querySelector('button').classList.add('enableSubmit')
                signupFormBtn.disabled=false

            }
            else{
             form.querySelector('button').classList.add('disableSubmit')
             form.querySelector('button').classList.remove('enableSubmit')
             form.disabled=true
            }
        })
     }
}


//blur
signupForm.name.addEventListener('blur', ()=>{
   if(!signupForm.name.value.length>0){
     signupForm.name.value='נא כתבו את שמכם...'
     signupForm.name.classList.add('warning')
   }
})
signupForm.age.addEventListener('blur', ()=>{
    if(!signupForm.age.value.length>0){
        signupForm.age.value='נא ציינו את גילכם...'
        signupForm.age.classList.add('warning')
    }
    else if(signupForm.age.value<=12){
        signupForm.age.classList.add('warning')
        signupForm.age.value='הרשמה אפשרית מעל גיל 12...'
    }
 })


 //focus
 for(let child of signupForm){
     child.addEventListener('focus',()=>{
         child.value=''
         child.classList.remove('warning')
     })
 }




signupForm.addEventListener('submit',(event)=>{
    // event.getPreventDefault
    event.preventDefault()

    const userData={
        name:signupForm.name.value,
        age:signupForm.age.value,
        email:signupForm.email.value,
        password:signupForm.password.value
    }

    addUserToDB(userData)    
})


loginForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const userLoginData={
        email:loginForm.email.value,
        password:loginForm.password.value
    }
    loginUser(userLoginData)
})

for (let book of books)
{
    book.addEventListener('click',()=>{
        renderBookInfo(book)
        setTimeout(() => {
            booksInfoModal.classList.remove('display-none')

        }, 400);
    })
}



// //*************cart***************

// //elements
// const cartModalBg=document.getElementById("cart-modal-bg")
// const cartModal=document.getElementsByClassName("cart-modal")[0]
// // const purchasedBooksContainer=document.getElementsByClassName('purchased-books-container')[0]
// const payBtn=document.getElementsByClassName('pay-btn')[0]
// const cartMainIcon=document.getElementsByClassName('utils-container')[0].getElementsByClassName('fa-shopping-cart')[0]
// const purchasedCartIcon=document.getElementsByClassName('cart-icon')[0]
// const purchasedBooksCounter=document.getElementsByClassName('purchased-books-counter')[0]
// //functions
// const openPurchasedBooksModal=()=>{
//     cartModal.classList.remove('display-none')
//     cartModalBg.classList.remove('display-none')
// }
// const closePurchasedBooksModal=()=>{
//     cartModal.classList.add('display-none')
//     cartModalBg.classList.add('display-none')
// }


// const bookPurchased=(bookId)=>{
//         token=localStorage.getItem('token')
//         fetch(`/users/bookPurchase/${bookId}`, {
//             method: 'POST', 
//             headers: {
//                'Content-Type': 'application/json',
//                'Authorization': `Bearer ${token}`   
//             }
//             })
//             .then(response =>{ 
//                 if(response.status!==200)
//                    throw Error()
//                 return response.json()  
//             })
//             .then(data=>{
//                 console.log(data)
//                 purchasedBooksCounter.classList.remove('display-none')
//                 purchasedBooksCounter.innerHTML=data.length
//              })
//             .catch((err)=>{
//                 closeBooksModal()
//                 mustLoggedInModal.classList.remove('display-none')
//             })
           
//      }

// const closeMustLoginModal=()=>{
//     mustLoggedInModal.classList.add('display-none')

// }
// const renderPurchasedBooks=(purchasedBooksImgUrl)=>{
    
// }

// const removeBookFromCart=(bookId)=>{
//       token=localStorage.getItem('token')
//         fetch(`/users/bookUnPurchase/${bookId}`, {
//             method: 'POST', 
//             headers: {
//                'Content-Type': 'application/json',
//                'Authorization': `Bearer ${token}`   
//             }
//             })
//             .then(response =>{ 
//                 if(response.status!==200)
//                    throw Error()
//                 return response.json()  
//             })
//             .then(data=>{
//                 console.log(data)
//                 openPurchasedBooksModal()
//                 renderBooksImagesById()
//                 // purchasedBooksCounter.classList.remove('display-none')
//                 // purchasedBooksCounter.innerHTML=data.length
//              })
//             .catch((err)=>{
//                 closeBooksModal()
//                 mustLoggedInModal.classList.remove('display-none')
//             })
          
// }

// //events

// window.addEventListener('click',(event)=>{
//     if(event.target===cartModalBg || event.target.className==="fas fa-times" && !event.target.classList.contains('remove-book-btn') ){
//         closePurchasedBooksModal()
//         closeMustLoginModal()
//     }
// })

// purchasedCartIcon.addEventListener('click',()=>{
//     closeModal()
//     bookPurchased(localStorage.getItem('bookId'))
// })

// mustLoggedInButton.addEventListener('click', ()=>{
//     modalBackground.classList.remove('dispaly-none')
//     closeMustLoginModal()
//     openLoginModal()
// })



///////on load
signupFormBtn.disabled=true
// // loginFormBtn.disabled=true
// renderImages()
