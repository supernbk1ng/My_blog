import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: import.meta.env.PROD
    ? {
        kind: 'github',
        repo: {
          owner: 'supernbk1ng',
          name: 'My_blog',
        },
      }
    : {
        kind: 'local',
      },
  singletons: {
    about: singleton({
      label: 'About Me',
      path: 'src/content/about/index',
      format: { contentField: 'content' },
      schema: {
        headline: fields.text({ label: 'Headline' }),
        content: fields.document({
          label: 'Bio',
          formatting: true,
          dividers: true,
          links: true,
        }),
        skills: fields.array(fields.text({ label: 'Skill' }), { label: 'Skills', itemLabel: props => props.value }),
        experience: fields.array(
          fields.object({
            role: fields.text({ label: 'Role' }),
            company: fields.text({ label: 'Company' }),
            period: fields.text({ label: 'Period' }),
            description: fields.text({ label: 'Description', multiline: true }),
          }),
          { label: 'Experience', itemLabel: props => `${props.fields.role.value} at ${props.fields.company.value}` }
        ),
        socialLinks: fields.object({
            email: fields.text({ label: 'Email' }),
            github: fields.text({ label: 'GitHub URL' }),
            twitter: fields.text({ label: 'Twitter URL' }),
        }, { label: 'Social Links' })
      },
    }),
  },
  collections: {
    blog: collection({
      label: 'Blog',
      slugField: 'slug',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        slug: fields.slug({ name: { label: 'Slug' } }),
        title: fields.text({ label: 'Title', validation: { length: { min: 1 } } }),
        description: fields.text({ label: 'Description', multiline: true }),
        pubDate: fields.date({ label: 'Publication Date', validation: { isRequired: true } }),
        updatedDate: fields.date({ label: 'Updated Date' }),
        heroImage: fields.image({
          label: 'Hero Image',
          directory: 'public/blog-images',
          publicPath: '/blog-images/',
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          { label: 'Tags', itemLabel: props => props.value }
        ),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/blog-images',
            publicPath: '/blog-images/',
          },
        }),
      },
    }),
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        link: fields.url({ label: 'Live Link' }),
        repo: fields.url({ label: 'Repo Link' }),
        heroImage: fields.image({
          label: 'Hero Image',
          directory: 'public/project-images',
          publicPath: '/project-images/',
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          { label: 'Tags', itemLabel: props => props.value }
        ),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/project-images',
            publicPath: '/project-images/',
          },
        }),
      },
    }),
  },
});
