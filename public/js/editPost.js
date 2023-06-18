async function editPost(e) {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;
    const id = this.dataset.id;

    const res = await fetch(`/api/post/${id}`, {
        method: 'PUT',
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
        console.log("Error editing this post");
    }
}
document.querySelector('#edit_post').addEventListener('submit', editPost);


async function handlePostDelete(e) {
    e.preventDefault();

    const id = window.location.pathname.split("/")[2];

    const res = await fetch(`/api/post/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json',
        },
    })
    if (res.ok) {
        document.location.replace('/');
    } else {
        console.log('Error deleting this post');
    }

}
document.querySelector('#delete').addEventListener('click', handlePostDelete);
