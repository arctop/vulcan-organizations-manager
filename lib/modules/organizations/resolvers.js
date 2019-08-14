const resolvers = {
  multi: {
    name: 'organizations',

    async resolver(root, args, context) {
      const { input: {terms = {}} = {terms: {}} } = args;
      let { selector, options } = await context.Organizations.getParameters(terms, {}, context.currentUser);
      let organizations = await context.Organizations.find(selector, options);
      let organizationsContent = organizations.fetch();
      let viewableOrganizationsContent = _.filter(organizationsContent, organizationsContent => context.Organizations.checkAccess(context.currentUser, organizationsContent));
      let organizationsCount = organizations.count();
      return { results: viewableOrganizationsContent, totalCount: context.Users.isAdmin(context.currentUser) ? organizationsCount : null };
    },
  },

  single: {
    name: 'organization',

    resolver(root, args, context) {
      const _id = args.input.selector.documentId || args.input.selector._id; // we keep this for backwards comp until SmartForm passes _id as a prop
      const document = context.Organizations.findOne({ _id: _id });
      return { result: context.Users.restrictViewableFields(context.currentUser, context.Organizations, document) };
    },
  },
};

export default resolvers;
