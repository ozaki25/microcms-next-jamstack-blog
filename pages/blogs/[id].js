import styles from '../../styles/Home.module.scss';

export default function BlogId({ blog }) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.publishedAt}>{blog.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{ __html: `${blog.body}` }}
        className={styles.post}
      />
    </main>
  );
}

export const getStaticPaths = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };

  const repos = await fetch(
    `https://${process.env.API_DOMAIN}.microcms.io/api/v1/blogs`,
    key,
  )
    .then(res => res.json())
    .catch(() => null);

  const paths = repos.contents.map(repo => `/blogs/${repo.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async context => {
  const id = context.params.id;

  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };

  const data = await fetch(
    `https://${process.env.API_DOMAIN}.microcms.io/api/v1/blogs/` + id,
    key,
  )
    .then(res => res.json())
    .catch(() => null);

  console.log(data);
  return {
    props: {
      blog: data,
    },
  };
};
