import gql from "graphql-tag";

export const NOTE_QUERY = gql`
  query noteById($id: ID!) {
    getNote(id: $id) {
      id
      title
      body
      updatedAt
      notebook {
        name
        id
      }
    }
  }
`;

export const NEW_NOTE_MUTATION = gql`
  mutation newNote($title: String!, $body: String, $notebookId: ID) {
    createNote(
      values: { title: $title, body: $body, notebookId: $notebookId }
    ) {
      ok
      note {
        id
        title
        body
      }
    }
  }
`;

export const ALL_NOTES_QUERY = gql`
  query allNotes {
    allNotes {
      title
      body
      id
      updatedAt
    }
  }
`;

export const SELECTED_NOTEBOOK_NOTES_QUERY = gql`
  query notesByNotebookId($notebookId: ID!) {
    notesByNotebook(notebookId: $notebookId) {
      ok
      notes {
        id
        title
        body
        updatedAt
      }
      notebook {
        id
        name
      }
    }
  }
`;

export const TAGS_AND_NOTEBOOKS_QUERY = gql`
  query getNotebooksAndTags {
    allNotebooks {
      id
      name
    }
    allTags {
      id
      name
    }
  }
`;

export const INVALIDATE_TOKENS_MUTATION = gql`
  mutation logout {
    invalidateTokens
  }
`;

export const REGISTER_MUTATION = gql`
  mutation register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      ok
      token
      refreshToken
    }
  }
`;

export const SAVE_CHANGES_MUTATION = gql`
  mutation saveChanges($id: ID!, $title: String!, $body: String!) {
    updateNote(id: $id, values: { title: $title, body: $body }) {
      ok
      note {
        id
        title
        body
      }
    }
  }
`;

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email) {
      ok
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
    }
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password) {
      ok
    }
  }
`;
