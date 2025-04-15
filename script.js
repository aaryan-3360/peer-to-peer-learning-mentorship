function uploadVideo() {
    const fileInput = document.getElementById("videoUpload");
    const file = fileInput.files[0];
    if (!file) return alert("Please select a video file");
  
    const video = document.getElementById("videoPlayer");
    const source = document.getElementById("videoSource");
    const url = URL.createObjectURL(file);
    source.src =url;
    video.load();
    alert("video load succesfully");
  }
  
  function addComment() {
    const commentInput = document.getElementById("commentInput");
    const commentText = commentInput.value;
    const video = document.getElementById("videoPlayer");
    const timestamp = video.currentTime;
  
    if (commentText.trim() === "") return;
  
    const commentList = document.getElementById("commentList");
    const newComment = document.createElement("div");
    newComment.classList.add("comment");
    newComment.innerHTML = `<strong class="timestamp" data-time="${timestamp}">${formatTime(timestamp)}</strong>: ${commentText} 
    <button class="Remove-btn">Remove</button>`;
    commentList.appendChild(newComment);
    
    //clickabe comment time
    newComment.querySelector(".timestamp").addEventListener("click",function()
  {
    video.currentTime =parseFloat(this.getAttribute("data-time"));
    video.play();
  });
//remove button
  newComment.querySelector(".Remove-btn").addEventListener("click",function(){
    commentList.removeChild(newComment);
  });
  

  
//clear button
  document.getElementById("clearbtn").onclick =function()
  {
    document.getElementById("commentList").innerHTML = "";
  };
  
    commentInput.value = "";
  }
  //download feedback
  function downloadfeedback(){
    let items =document.querySelectorAll("#commentList >div");
    let feedbacks =[];
    items.forEach(item => {
      let clone = item.cloneNode(true);
      let button =clone.querySelector("button");
      if(button){
        button.remove();
      }
      let text =clone.textContent.trim();
      if(text){
        feedbacks.push(text);
      }
    });
   
    let blob =new Blob([feedbacks.join("\n")],{
      type: "text/plain"});
      let link =document.createElement("a");
      link.href =URL.createObjectURL(blob);
      link.download ="feedback.txt";
      link.click();
      if(feedbacks.length === 0)
        {
          alert("No feedback to download");
          return;
        }else{
          alert("Feedbacks download succesfully")
        }
  }
  
  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `0${min}:${sec < 10 ? "0" : ""}${sec}`;
  }


const themeToggleBtn = document.getElementById("themeToggleBtn");
// Theme Toggle Functionality
themeToggleBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark-theme");

    // Toggle the button text (🌙 for dark theme, 🌞 for light theme)
    const isDark = document.body.classList.contains("dark-theme");
    themeToggleBtn.textContent = isDark ? "🌞" : "🌙"; // Change the icon
});

//select Role
document.getElementById("roleSelect").addEventListener("change",function(){
  let role =this.value;

let videoSection = document.getElementById("videoSource");
let commentbox =document.getElementById("comment-box");
let comments =document.getElementById("comments");
let uploadform =document.getElementById("upload-form");
let btn =document.getElementById("btn");
  if(role === "student")
  {alert("Role changed to Student")
    videoSection.style.display ="block";
    commentbox.style.display ="block";
    comments.style.display ="block";
    uploadform.style.display ="none";
    btn.style.display="none";
  }else{
    alert("Role changed to Instructor");
    videoSection.style.display ="block";
    commentbox.style.display ="none";
    comments.style.display ="block";
    uploadform.style.display ="block";
    btn.style.display="block";
  }
});