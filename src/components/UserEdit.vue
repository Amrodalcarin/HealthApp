<template>
  <v-card min-width="100%" class="d-flex flex-column justify-space-around">
    <v-card-text>
      <v-layout row wrap class="mb-8">
        <v-avatar size="96" class="mr-4">
          <img :src="avatar" alt="Avatar" />
        </v-avatar>
        <v-file-input
          :rules="rules"
          @change="previewImage"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick an avatar"
          prepend-icon="mdi-camera"
          label="Avatar"
          v-model="avatarFile"
        ></v-file-input>
      </v-layout>
      <v-text-field v-model="username" label="Username"></v-text-field>
      <v-label label="Email Address">{{email}}</v-label>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" :loading="loading" @click="updateUser()">
        Save Changes
        <v-icon right>fa-check</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
const fb = require("../../firebaseConfig");

export default {
  data: () => ({
    loading: false,
    showAvatarPicker: false,
    username: fb.auth.currentUser.displayName,
    email: fb.auth.currentUser.email,
    avatar: fb.auth.currentUser.photoURL,
    avatarFile: null,
    picture: null,
    uploadValue: null,
    rules: [
      value =>
        !value ||
        value.size < 2000000 ||
        "Avatar size should be less than 2 MB!"
    ]
  }),
  methods: {
    updateUser() {
      const user = fb.auth.currentUser;
      if (this.avatarFile) {
        this.updateUserAvatar();
      } else {
        user
          .updateProfile({
            displayName: this.username
          })
          .then(() => {
            this.$router.go(0);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    previewImage() {
      this.uploadValue = 0;
      this.picture = null;
    },
    updateUserAvatar() {
      const user = fb.auth.currentUser;

      if (user.photoURL) {
        this.deleteAvatar(user.photoURL);
      }

      this.picture = null;
      const storageRef = fb.storage
        .ref(`${this.avatarFile.name}`)
        .put(this.avatarFile);
      storageRef.on(
        `state_changed`,
        snapshot => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then(url => {
            console.log("imagen subida");
            this.picture = url;
            user
              .updateProfile({
                displayName: this.username,
                photoURL: this.picture
              })
              .then(() => {
                this.$router.go(0);
              })
              .catch(err => {
                console.log(err);
              });
          });
        }
      );
    },
    deleteAvatar(url) {
      fb.storage
        .refFromURL(url)
        .delete()
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>