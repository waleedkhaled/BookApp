import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, StyleSheet } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Swipeable } from 'react-native-gesture-handler';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BOOKS_LIST, CREATE_BOOK } from '../graphql/queries';

interface Book {
  id: number;
  title: string;
  author: string;
  publicationYear: string;
}

const validationBookSchema = Yup.object().shape({
  name: Yup.string().required('Book Name is required'),
  author: Yup.string().required('Author Name is required'),
  publishDate: Yup.string().required('Publish Date is required'),
});

const Home = () => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [books, setBooks] = useState<Book[]>([])
  

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const { data: booksList } = useQuery(GET_BOOKS_LIST);
  const [createBook, { data: status }] = useMutation(CREATE_BOOK);



  const openActionSheet = (book: Book) => {
    setSelectedBook(book);
    actionSheetRef.current?.show();
  };

  const closeActionSheet = () => {
    setSelectedBook(null);
    actionSheetRef.current?.hide();
  };

  const openAddBookActionSheet = () => {
    setSelectedBook(null);
    actionSheetRef.current?.show();
  };

  const removeBook = (bookId: number) => {
    const updatedBooks = books.filter((book) => book.id !== bookId);
    setBooks(updatedBooks);
  };

  const saveBook = (values: Book, actions: any) => {
    // const updatedBooks = selectedBook
    //   ? books.map((book) => (book.id === selectedBook.id ? { ...selectedBook, ...values } : book))
    //   : [...books, { ...values, id: Date.now() }];
 
    // setBooks(updatedBooks);
    createBook({
      variables: {
        input: {
         ...values
        },
      },
    });
    actions.resetForm();
    closeActionSheet();
  };


  const renderDeleteButton = (bookId: number) => (
    <TouchableOpacity style={styles.deleteButton} onPress={() => removeBook(bookId)}>
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: Book }) => (
    <Swipeable renderRightActions={() => renderDeleteButton(item.id)}>
      <TouchableOpacity onPress={() => openActionSheet(item)}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemName}>{item.title}</Text>
          <Text style={styles.itemAuthor}>{item.author}</Text>
          <Text style={styles.itemPublishDate}>{item.publicationYear}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={booksList.getBooksList.books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContentContainer}
      />

      <TouchableOpacity style={styles.floatingButton} onPress={openAddBookActionSheet}>
        <Text style={styles.addButtonLabel}>+</Text>
      </TouchableOpacity>

      <ActionSheet ref={actionSheetRef}>
        <View style={styles.actionSheetContainer}>
          <Formik
            initialValues={{
              id: selectedBook?.id || 0,
              title: selectedBook?.title || '',
              author: selectedBook?.author || '',
              publicationYear: selectedBook?.publicationYear || '',
            }}
            validationBookSchema={validationBookSchema}
            onSubmit={saveBook}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.modalContent}>
                <TextInput
                  style={styles.input}
                  placeholder="Book Name"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.title}
                />
                {touched.title && errors.title && (
                  <Text style={styles.errorText}>{errors.title}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Author Name"
                  onChangeText={handleChange('author')}
                  onBlur={handleBlur('author')}
                  value={values.author}
                />
                {touched.author && errors.author && (
                  <Text style={styles.errorText}>{errors.author}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Publish Date"
                  onChangeText={handleChange('publishDate')}
                  onBlur={handleBlur('publishDate')}
                  value={values.publicationYear}
                />
                {touched.publicationYear && errors.publicationYear && (
                  <Text style={styles.errorText}>{errors.publicationYear}</Text>
                )}

                <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>

          <TouchableOpacity style={styles.cancelButton} onPress={closeActionSheet}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1
  },
  itemContainer: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 60,
    height: 60,
    borderRadius: 30,
    elevation: 5,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#CCCCCC',
  },
  itemName: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  itemAuthor: {
    marginBottom: 4,
    fontSize: 14,
  },
  itemPublishDate: {
    fontSize: 14,
    color: '#888888',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  listContentContainer: {
    paddingBottom: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButtonLabel: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  actionSheetContainer: {
    padding: 16,
  },
  modalContent: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
});

export default Home;
