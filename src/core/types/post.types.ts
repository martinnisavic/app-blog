export interface Post {
    id: number,
    authorId:number,
    description: string,
    title: string,
    author: string,
    image: string,
    categoryId: number,
    categoryName: string,
    averageRating: number,
    ratingsCount: number,
    myRating: number,
    createdAt: string
}

export interface Category {
    id: number,
    name: string
}

export interface PagedResponse<T> {
    currentPage: number,
    perPage: number,
    totalCount: number,
    pagesCount: number,
    items: T[]
}

export interface CreatePostType{
    title:string,
    description:string,
    image:string,
    categoryId:number
}

export interface PostEditDTO{
    id: number,
    description: string,
    title: string,
    categoryId: number
}