import {
  Account,
  Avatars,
  Client,
  Databases,
  Storage,
  ID,
  Query,
} from "react-native-appwrite";

const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.znt.aora",
  projectId: "6725b0460009d7824357",
  databaseId: "6725b3400007dc515c66",
  userCollectionId: "6725b368002644312fb1",
  videoCollectionId: "6725b386000739c2eae0",
  storageId: "6725b5ba003bbdcaca84",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);
const storage = new Storage(client);

export const createUser = async ({ username, email, password }) => {

  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error();

    const avatar_url = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await database.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatar_url,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) throw Error('no session');

    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const singOut = async () => {
    try {
        const session = await account.deleteSession('current');
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;
    const currentUser = await database.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await database.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc('$createdAt')],
    );

    return posts.documents;
  } catch (error) {
    throw Error(error);
    console.log(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await database.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$updatedAt", Query.limit(7))]
    );

    return posts.documents;
  } catch (error) {
    throw Error(error);
    console.log(error);
  }
};

export const getSearchPosts = async (query) => {
  try {
    const posts = await database.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search("title", query)]
    );

    return posts.documents;
  } catch (error) {
    throw Error(error);
    console.log(error);
  }
};

export const getUserPosts = async (userId) => {
  try {
    const posts = await database.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal('users', userId), Query.orderDesc('$createdAt')],
    );

    return posts.documents;
  } catch (error) {
    throw Error(error);
    console.log(error);
  }
};

export const getFileUrl = (fileId, type) => {
  let fileUrl;
  if (type === 'video') {
    fileUrl = storage.getFileView(config.storageId, fileId);
  } else if (type === 'image') {
    fileUrl = storage.getFilePreview(config.storageId, fileId, 2000, 2000, 'top', 100);
  } else {
    throw new Error('Invalid file format');
  }

  if (!fileUrl) throw Error;

  return fileUrl;

}

export const uploadFile = async (file, type) => {
  if (! file) return;

  const { mimeType, fileName, fileSize, uri } = file;

  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      {
        type: mimeType,
        size: fileSize,
        name: fileName,
        uri
      }
    )

    const fileUrl = getFileUrl(uploadedFile.$id, type);
    return fileUrl;

  } catch (error) {
    throw new Error(error);
  }
}

export const createPost = async (form) => {
  try {
    const [videoUrl, thumbnailUrl] = await Promise.all([
      uploadFile(form.video, 'video'),
      uploadFile(form.thumbnail, 'image'),
    ])

    const newPost = await database.createDocument(config.databaseId, config.videoCollectionId, ID.unique(), {
      title: form.title,
      thumbnail: thumbnailUrl,
      video: videoUrl,
      prompt: form.prompt,
      users: form.userId
    })

    if (!newPost) throw Error;
    return newPost;

  } catch (error) {
    throw new Error(error);
  }
}
