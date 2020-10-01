import styles from '../../styles/Home.module.scss';

export default function BlogId({ blog }) {
  if (!blog) return <p>Not Found</p>;

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.publishedAt}>{blog.publishedAt}</p>
      <p className={styles.category}>
        {blog.category && `${blog.category.name}`}
      </p>
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
  return { paths, fallback: true };
};

export const getStaticProps = async context => {
  const id = context.params.id;
  const draftKey = context.previewData?.draftKey;

  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };

  const data = await fetch(
    `https://${process.env.API_DOMAIN}.microcms.io/api/v1/blogs/${id}${
      draftKey ? `?draftKey=${draftKey}` : ''
    }`,
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
