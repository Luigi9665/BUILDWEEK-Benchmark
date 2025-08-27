/* Variables */
const rating = document.querySelector('.rating');

const comment = document.getElementById('comment');
const submitBtn = document.getElementById('submit');
const commentsList = document.getElementById('comments-list');

const feedbackBtn = document.querySelector('.btn-general');
const starColor = document.querySelectorAll('.star');
feedbackBtn.classList.add('no-before');


/* Rating system */
rating.addEventListener('click', (event) => {
  if (event.target.classList.contains('star')) {

    const starValue = event.target.getAttribute('data-value');
     starColor.forEach(star => {
      if (parseInt(star.getAttribute('data-value')) <= parseInt(starValue)) {
        star.classList.add('star-color');
      } else {
        star.classList.remove('star-color');
      }
    });
  }
});



/* Input */
comment.addEventListener('input', () => {
  if(comment.value.trim() === ''){
    feedbackBtn.classList.add('no-before');
  } else {
    feedbackBtn.classList.remove('no-before');
  }
});

/* Submit Button */
submitBtn.addEventListener('click', () => {

  if(comment.value.trim() !== ""){
    
    const newListItem = document.createElement('li');
    commentsList.appendChild(newListItem);
    newListItem.innerHTML = comment.value;
    comment.value = "";
    feedbackBtn.classList.add('no-before'); 
    const starOver = document.querySelectorAll('.star-color');
    starOver.forEach(star => {
      star.classList.remove('star-color');
    });
  }
});

