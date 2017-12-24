import  Api from '@/services/Api'

export default{
  nearbyShops(obj){
    return Api().post('dashboard/shops', obj)
  },
  preferredShops(obj){
    return Api().post('dashboard/preferred-shops', obj)
  },
  likeShop(id){
    return Api().post('users/like', id)
  },
  dislikeShop(id){
    return Api().post('users/dislike', id)
  },
  removeLiked(id){
    return Api().post('users/remove-liked', id)
  }
}
