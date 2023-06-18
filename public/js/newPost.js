async function newPost(e){
  e.preventDefault();

  const title = document.querySelector('#post_title').value;
  const content = document.querySelector('#content').value;

  const res = await fetch(`/api/post`,{
    method: 'POST',
    body: JSON.stringify({
      title,
      content,
     }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
    
  if (res.ok) {
    document.location.replace('/');
  } else {
    console.log("Error creating a new post");
  }
}

document.querySelector('#new_post').addEventListener('submit', newPost);

