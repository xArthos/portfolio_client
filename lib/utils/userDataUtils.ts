// Modules
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

// Mutations Schemas
export const login = gql`
    mutation login($email: Email!, $password: Password!) {
        logIn(email: $email, password: $password)
    }
`;

// Queries Schemas
export const getCurrentUserQuery = gql`
  query getCurrentUser {
    currentUser {
      _id
      name {
        firstName
        secondName
        lastName
        firstName
      }
      nickname
      type
      email {
        current
        isVerified
        oldEmails
      }
      avatar {
        source
        blockAvatar {
          color
        }
      }
    }
  }
`;

export const getUserQuery = gql`
  query getUserById($_id: ObjectId!) {
    user(_id: $_id) {
      _id
      name {
        firstName
        secondName
        lastName
        firstName
      }
      nickname
      type
      email {
        current
        isVerified
        oldEmails
      }
      avatar {
        source
        blockAvatar {
          color
        }
      }
    }
  }
`;

//////////////////
// Query Functions

// GET CURRENT USER
export const useGetCurrentUser = () => {
  const props = useQuery(getCurrentUserQuery);

  if (!props.data) {
    props.data = { currentUser: undefined };
  };

  return props;
};

// GET USER QUERY
export const useGetUserById = (_id: any) => {
  const props = useQuery(getUserQuery, { variables: { _id }, skip: !_id || _id === null });

  if (!props.data) {
    props.data = { user: {} };
  };

  return props;
};