export default {
  data() {
    return {
      imagePreviewURL: null,
      profileImagePreviewURL: null,
      portalPreviewURL: null,
      retinaPreviewURL: null,
      favPreviewURL: null,
      portalLogo: null,
      retinaLogo: null,
      favIconLogo: null,
      profileImage: null,
      authUserProfile: null,
      btnLoading: false,
      userManualData: [],
      profile_url: {
        id: null,
        fileName: null,
        resourceId: null,
        fileUrl: null,
        type: null,
        descriptions: null,
        fileType: null,
        fileSize: null
      },
      thumbnail: null,
      file: null,
      userManualDialog: false,
      userManualItems: [],

      generalSettingsItems: [],
      settingsData: {},
      portal_email: '',

      featureImage: null,
      featureModel: false,
      featureName: null,

      logo: null
    }
  },

  watch: {},

  methods: {
    onFileChange(payload) {
      //const file = payload.target.files[0]; // use it in case of normal HTML input
      const file = payload.target.files[0]; // in case vuetify file input
      this.profileImage = file;
      if (file) {
        this.messagePayload = file;
        this.messageFileRemoveKey = true
        if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
          this.portalLogo = file
          this.imagePreviewURL = URL.createObjectURL(file);
          URL.revokeObjectURL(file); // free memory
          this.messageFile = file.name
        } else if (file.type === 'application/x-zip-compressed' || file.type === 'application/pdf' ||
          file.type === 'application/docx' || file.type === 'video/mp4' || file.type === 'text/plain' ||
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
          this.messageFile = file.name
        } else {
          this.messageErrorMessage = 'File Accept Only png/jpg, docx/pdf/pptx, zip, text files'
          this.messageFileRemoveKey = false
        }
      } else {
        this.imagePreviewURL = null
        this.messageFileRemoveKey = false
      }
    },
    onRetinaChange(payload) {
      //const file = payload.target.files[0]; // use it in case of normal HTML input
      const file = payload.target.files[0]; // in case vuetify file input
      this.profileImage = file;
      if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg')
      {
        this.retinaLogo = file
        this.retinaPreviewURL = URL.createObjectURL(file);
        URL.revokeObjectURL(file); // free memory
      }
    },
    onFavChange(payload) {
      //const file = payload.target.files[0]; // use it in case of normal HTML input
      const file = payload.target.files[0]; // in case vuetify file input
      this.favIconLogo = file;
      if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
        this.favPreviewURL = URL.createObjectURL(file);
        URL.revokeObjectURL(file); // free memory
      }
    },

    onFileInput(payload) {
      // console.log(payload.name)
      // console.log(payload.type)
      this.imagePreviewURL = URL.createObjectURL(payload);
      this.portalLogo = payload
    },
    onRetinaInput(payload) {
      this.retinaPreviewURL = URL.createObjectURL(payload);
      this.retinaLogo = payload
    },
    onFavInput(payload) {
      this.favPreviewURL = URL.createObjectURL(payload);
      this.favIconLogo = payload
    },

    async storeGeneralSetting(portalLogo, retinaLogo, favIcon, email) {
      const formData = new FormData();
      if (portalLogo) {
        formData.append('portal_logo', portalLogo)
      }
      if (retinaLogo) {
        formData.append('retina_portal_logo', retinaLogo)
      }
      if (favIcon) {
        formData.append('favicon', favIcon)
      }

      formData.append('portal_email', email);
      this.btnLoading = true
      await this.$axios.post('/settings', formData)
          .then((response) => {
            if (response.data.error) {
              return this.$toast.error(response.data.message)
            }
            this.settingsData = JSON.parse(JSON.stringify(response.data.data.settings))
            this.$nextTick(() => {
              this.imagePreviewURL = this.settingsData.logoPreviewURL;
              this.retinaPreviewURL = this.settingsData.retinaPreviewURL;
              this.favPreviewURL = this.settingsData.favPreviewURL;
              this.portal_email = this.settingsData.portal_email;

              this.favIconLogo = null
              this.portalLogo = null
              this.retinaLogo = null
            })
            this.$toast.success(response.data.message);

            this.imagePreviewURL = null
            this.favPreviewURL = null
            this.retinaPreviewURL = null

          })
          .catch(error => {
            console.log(error.response)
            this.$toast.error(error.response.data.message)
          })
          .finally(() => {
            this.btnLoading = false
          })

    },


    async storeProfile(file, field) {
      const formData = new FormData()
      if (file) {
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.addEventListener('load', () => {
          this.profile_url.fileUrl = fr.result
        })
        formData.append('image', file)
        // formData.append('id', beaconId)
      }
      formData.append('first_name', field.first_name ? field.first_name : '');
      formData.append('last_name', field.last_name ? field.last_name : '');
      formData.append('email', field.email ? field.email : '');
      formData.append('mobile', field.mobile ? field.mobile : '');
      formData.append('password', field.password ? field.password : '');
      formData.append('dob', field.dob ? field.dob : '');
      formData.append('gender', field.gender ? field.gender : '');
      formData.append('street', field.street ? field.street : '');
      formData.append('state', field.state ? field.state : '');
      formData.append('zip_code', field.zip_code ? field.zip_code : '');
      formData.append('country', field.country ? field.country : '');
      formData.append('role', field.role ? field.role : '');
      formData.append('city', field.city ? field.city : '');

      await this.$axios.post('/staff', formData)
        .then((response) => {
          if (response.data.error) {
            return this.$toast.error(response.data.message)
          }
         // console.log(response.data)
          this.$toast.success(response.data.message);
          this.$store.dispatch('staff/initItems')
          this.$nextTick(() => {
            this.$router.push('/staff')
          })
        })
        .catch(error => {
          //console.log(error.response)
          this.$toast.error(error.response.data.message)
        })
        .finally(() => {
          this.btnLoading = false
        })
    },
    async updateProfile(file, field, id) {
      const formData = new FormData()
      if (file) {
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.addEventListener('load', () => {
          this.profile_url.fileUrl = fr.result
        })
        formData.append('image', file)
        // formData.append('id', beaconId)
      }
      formData.append('first_name', field.first_name ? field.first_name : '');
      formData.append('last_name', field.last_name ? field.last_name : '');
      formData.append('email', field.email ? field.email : '');
      formData.append('mobile', field.mobile ? field.mobile : '');
      formData.append('password', field.password ? field.password : '');
      formData.append('dob', field.dob ? field.dob : '');
      formData.append('gender', field.gender ? field.gender : '');
      formData.append('street', field.street ? field.street : '');
      formData.append('state', field.state ? field.state : '');
      formData.append('zip_code', field.zip_code ? field.zip_code : '');
      formData.append('country', field.country ? field.country : '');
      formData.append('role', field.role ? field.role : '');
      formData.append('city', field.city ? field.city : '');
      formData.append('_method','PUT');
      await this.$axios.post(`/staff/${id}`, formData)
        .then((response) => {
          if (response.data.error) {
            return this.$toast.error(response.data.message)
          }
         // console.log(response.data)
          this.$toast.success(response.data.message);
          this.$store.dispatch('staff/initItems')
          this.$nextTick(() => {
            this.$router.push('/staff')

          })
        })
        .catch(error => {
          //console.log(error.response)
          this.$toast.error(error.response.data.message)
        })
        .finally(() => {
          this.btnLoading = false
        })
    },


    onThumbnailInput(payload) {
      this.thumbnail = payload;
    },
    onPdfFileInput(payload) {
      this.file = payload
    },
    async storeUserManual(thumbnail, file, title) {
      const formData = new FormData();
      // const thumbr = new FileReader()
      // const filer = new FileReader()
      // filer.readAsDataURL(file)
      // thumbr.readAsDataURL(thumbnail)
      formData.append('thumbnail', thumbnail)
      formData.append('file', file)
      formData.append('title', title)
      this.btnLoading = true
      await this.$axios.post('/user-manual', formData)
        .then((response) => {
          if (response.data.error) {
            return this.$toast.error(response.data.message)
          }
         // console.log(response.data)
          this.userManualItems.push(JSON.parse(JSON.stringify(response.data.data)))
          this.$toast.success(response.data.message);
          this.userManualDialog = false
          this.thumbnail = null
          this.file = null

        })
        .catch(error => {
          console.log(error.response)
          this.$toast.error(error.response.data.message)
        })
        .finally(() => {
          this.btnLoading = false
        })
    },
    async changeUserManual(thumbnail, file, title, id, indexNo) {
      const fData = new FormData();
      fData.append('title', title);

      if (thumbnail)
        fData.append('thumbnail', thumbnail);

      if (file)
        fData.append('file', file);


      fData.append('_method','PUT')
      this.btnLoading = true;
      await this.$axios.post(`/user-manual/${id}`, fData)
        .then((response) => {
          if (response.data.error) {
            return this.$toast.error(response.data.message)
          }
          // console.log(response.data)
          Object.assign(this.userManualItems[indexNo], JSON.parse(JSON.stringify(response.data.data)))
          this.$toast.success(response.data.message);
          this.userManualDialog = false
          this.thumbnail = null
          this.file = null

        })
        .catch(error => {
          console.log(error.response)
          this.$toast.error(error.response.data.message)
        })
        .finally(() => {
          this.btnLoading = false
        })
    },


    onProfileInfoImageChange(payload) {
      const file = payload.target.files[0];
      this.authUserProfile = file;
      if (file)
        this.profileImagePreviewURL = URL.createObjectURL(file);
    },
    async updateProfileInfo(profileImage, data) {
      const formData = new FormData();
      formData.append('first_name', data.first_name)
      formData.append('last_name', data.last_name)
      formData.append('email', data.email)
      formData.append('timezone', data.timezone)
      if (profileImage)
        formData.append('image', profileImage);

      this.btnLoading = true;

      this.$axios.post('/profile', formData)
        .then((response) => {
          if (response.data.error)
            return this.$toast.error(response.data.message)
          this.$toast.success(response.data.message)
          //console.log(response.data.data)
          this.$auth.fetchUser()
         // this.$auth.user.data = Object.assign({}, JSON.parse(JSON.stringify(response.data.data)))
          // this.$auth.user.data.first_name = response.data.data.first_name
          // this.$auth.user.data.last_name = response.data.data.last_name
          // this.$auth.user.data.username = response.data.data.username
          // this.$auth.user.data.email = response.data.data.email
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
        .finally(() => {
          this.btnLoading = false
        })
    },


    onFeatureImageInput(payload) {
      this.featureImage = payload;
    },
    async saveFeatureInfo(featureImage, data) {
      const formData = new FormData();
      formData.append('name', data)
      formData.append('image', featureImage)

      this.btnLoading = true;

      this.$axios.post('/notification-feature', formData)
        .then((response) => {
          if (response.data.error)
            return this.$toast.error(response.data.message)
          this.$toast.success(response.data.message)
          this.closeFeatures()
        })
        .catch((error) => {
          this.$toast.error(error.response.data.message)
        })
        .finally(() => {
          this.btnLoading = false
        })
    },
    closeFeatures() {
      this.featureImage = null
      this.featureName = null
      this.featureModel = false
    },

    onLogoInput(payload)
    {
      this.logo = payload
    }
  }
}
