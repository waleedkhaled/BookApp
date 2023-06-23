import { gql } from '@apollo/client';

export const GET_BOOKS_LIST = gql`
  query GetBooksList {
    getBooksList {
      books {
        author
        createdAt
        id
        publicationYear
        updatedAt
        title
      }
      error {
        message
        code
      }
      success
    }
  }
`;

export const GET_SINGLE_BOOK = gql`
  query Book($getSingleBookId: String!) {
    getSingleBook(id: $getSingleBookId) {
      book {
        author
        createdAt
        id
        updatedAt
        publicationYear
        title
      }
      error {
        code
        message
      }
      success
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation CreateBook($input: book!) {
    createBook(input: $input) {
      book {
        id
        title
        author
        publicationYear
        createdAt
        updatedAt
      }
      error {
        code
        message
      }
      success
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($deleteBookId: String!) {
    deleteBook(id: $deleteBookId) {
      book {
        id
        title
        author
        publicationYear
        createdAt
        updatedAt
      }
      success
      error {
        message
        code
      }
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($input: book!) {
    updateBook(input: $input) {
      book {
        id
        title
        author
        publicationYear
        createdAt
        updatedAt
      }
      error {
        code
        message
      }
      success
    }
  }
`;
