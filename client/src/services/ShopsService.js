import  Api from '@/services/Api'

export default{
  nearbyShops(userLocation){
    return Api().post('dashboard/shops', userLocation)
  },
  preferredShops(id){
    return Api().post('dashboard/preferred-shops', id)
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
