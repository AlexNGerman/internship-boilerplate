export const createUser = {
  createUser: {
    id: '48'
  },
};

export const signInUser = {
  signInUser: {
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMywiZXhwIjoxNjQzMzc5MDg1fQ.7TOXsA6IgC7vyjWixUgTYRm9wPNU40oDC_nehDXFPt0',
  }
};

export const signUpError = [
  {
    message: 'Email has already been taken',
  },
];

export const signInError = [
  {
    message: 'Wrong email or password',
  },
];

export const createProject = {
  createProject: {
    deadline: '2022-02-18T12:01:46.000Z',
    description: 'Test Project Description',
    title: 'Test Project Title'
  }
};

export const createTask = {
  createTask: {
    content: 'Test Task Description',
  }
};

export const getProjects = {
  projects: [{
    createdAt:  '2022-02-09 22:00:49 UTC',
    deadline: '2022-02-10T10:00:00.000Z',
    id: 3,
    public:true,
    tasks: [
      {
        content: 'task 1',
        createdAt: '2022-02-10 11:18:52 UTC',
        done: true,
        id: 1,
        projectId: 3
      }
    ],
    title: 'Project 1'
  }]
};

export const getProjectsEmpty = {
  projects: []
};

export const deleteTask = {
  deleteTask: {
    id: 1
  }
};

export const getProject = {
  project: {
    createdAt: '2022-02-09 22:00:49 UTC',
    deadline: '2022-02-10T10:00:00.000Z',
    description: 'Project 1 with description',
    id: 3,
    public: true,
    tasks: [
      {
        content: 'task 1',
        createdAt: '2022-02-10 11:18:52 UTC',
        done: true,
        id: 1,
        projectId: 3
      }
    ],
    title: 'Project 1'
  },
};

export const deleteProject = {
  deleteProject: {
    id: 3
  }
}

export const updateProject = {
  updateProject: {
    id: 1,
  }
}
