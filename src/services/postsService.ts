import Api from './api';
export default {
    async getUserPosts(userId: number) {
        const  response = await Api.get('posts', { params: { userId: userId }});
        return response.data;
    }
}
