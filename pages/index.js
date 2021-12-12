import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Head from 'next/head'
import Post from '../components/Post'
import {sortByDate} from '../utils'

export default function Home( {posts} ) {
  console.log(posts)
  return (
    <div>
      <Head>
        <title>Next Markdown Blog</title>
      </Head>
      <div className="posts">
        {posts.map((post,index) => (
          // <h3>{post.frontmatter.title}</h3>
          <Post key={index} post={post} />
        ) )}
      </div>
      
    </div>
  )
}

export async function getStaticProps(){
  //Get files from the post directory
  const files = fs.readdirSync(path.join('posts'))

  //Get slug and front matter from post
  const posts = files.map(filename =>{
    //Create slug
    const slug = filename.replace('.md','')

    //Get frontmatter
    const markdownWithMeta = fs.readFileSync(path.join('posts',filename),'utf-8')

    const { data:frontmatter } = matter(markdownWithMeta)

    return{
      slug,
      frontmatter
    }
  })

  return{
    props: {
      posts: posts.sort(sortByDate)
    }
  }
}
