import {
  API,
  graphqlOperation
} from "aws-amplify"
import {
  createAlbum as createAlbumMutation
} from "@/graphql/mutations"
import {
  getAlbum as getAlbumQuery
} from "@/graphql/queries"
import {
  listAlbums as listAlbumsQuery
} from "@/graphql/queries"



export const state = () => ({
  albums: null
})

export const mutations = {
  setAlbums(state, payload) {
    state.albums = payload
  }
}

export const actions = {
  async createAlbum({
    dispatch
  }, newAlbum) {
    try {
      await API.graphql(graphqlOperation(createAlbumMutation, {
        input: newAlbum
      }))
      dispatch("getAlbumsData")
    } catch (error) {
      console.error("createalbum", error)
    }
  },
  async getAlbum(_, albumId) {
    return await API.graphql(
      graphqlOperation(getAlbumQuery, {
        id: albumId
      })
    )
  },
  async getAlbumsData({
    commit
  }) {
    const albumsData = await API.graphql(graphqlOperation(listAlbumsQuery))
    commit("setAlbums", albumsData.data.listAlbums.items)
  }
}
export const getters = {
  albums: (state) => state.albums
}
