import React, { Component } from 'react';
import { PostWrapper, Navigate, Post, Warning } from '../../components';
import * as service from '../../services/post';
//  위 코드는 아까 작성한 service/post.js 에서 export 한 함수를 모두 불러와서 service 안에 담는다.

class PostContainer extends Component {

    constructor(props) {
        super();
        // initializes component state
        this.state = {
            postId: 1,
            fetching: false, // tells whether the request is waiting for response or not
            post: {
                title: null,
                body: null
            },
            comments: [],
            warningVisibility: false
        };
    }

    handleNavigateClick = (type) => {
        const postId = this.state.postId;

        if(type === 'NEXT'){
            this.fetchPostInfo (postId + 1);
        }else{
            // if(postId === 1){
            //     return false;
            // }else{
            //     this.fetchPostInfo(postId - 1);
            // }
            this.fetchPostInfo(postId - 1);
        }
    }

    componentDidMount() {
        this.fetchPostInfo(1);
    }

    showWarning = () => {
        this.setState({
            warningVisibility: true
        });

        // after 1.5 sec

        setTimeout(
            () => {
                this.setState({
                    warningVisibility: false
                });
            }, 1500
        );
    }

    fetchPostInfo = async (postId) => {

        this.setState({
            fetching: true // requesting..
        });

        try{
            // wait for two promises
            const info = await Promise.all([
                // promise.all에 [] 배열을 전달해주면 결과값으로 이뤄진 배열을 반환함.
                service.getPost(postId),
                service.getComments(postId)
            ]);

            console.log(info);


            // Object destructuring Syntax,
            // takes out required values and create references to them
            const { title, body } = info[0].data; // 객체 비구조화 할당문법으로 필요한 값을 객체에서 꺼내서 레퍼런스를 만들어줌

            const comments = info[1].data;

            this.setState({
                postId,
                post: {
                    title,
                    body
                },
                comments,
                fetching: false // done!
            });
        } catch(e){
            this.setState({
                fetching: false
            });
            this.showWarning();
        }
    }

    render() {
        const { postId, fetching, post, comments, warningVisibility } = this.state;

        return (
            <PostWrapper>
                <Navigate
                    postId={postId}
                    disabled={fetching}
                    onClick={this.handleNavigateClick}
                />
                <Post
                    postId={postId}
                    title={post.title}
                    body={post.body}
                    comments={comments}
                />
                <Warning visible={warningVisibility} message="That post does not exist"/>
            </PostWrapper>
        );
    }
}

export default PostContainer;

// state를 추가하기 위해 class 형식으로 컴포넌트를 만든다.