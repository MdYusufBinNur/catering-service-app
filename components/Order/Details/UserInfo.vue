<template>
  <v-container fluid class="pa-0">
    <v-row>
      <!-- User details -->
      <v-col cols="12" md="4" sm="12" class="mt-8 text-center">
        <v-row class="pa-0">
          <v-col cols="12">
            <v-badge
              avatar
              bordered
              overlap
              color="accentlight"
              offset-x="30"
              offset-y="25"
              bottom
            >
              <template #badge>
                <v-avatar size="10">
                  <v-icon color="black" dense> mdi-camera-outline</v-icon>
                </v-avatar>
              </template>
              <v-avatar size="120" style="border: 2px solid darkgrey">
                <v-skeleton-loader
                  v-if="loading"
                  type="avatar"
                ></v-skeleton-loader>
                <v-img
                  v-else
                  :src="data.image ? data.image : noImage"
                  contain
                  class="rounded-circle"
                ></v-img>
              </v-avatar>
            </v-badge>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col></v-col>
          <v-col cols="auto">
            <v-badge bordered :color="data.active ? 'success' : ''" overlap dot>
              <v-btn
                plain
                text
                color="black"
                class="text-capitalize ppns_title_3"
              >
                {{ data.full_name }}
              </v-btn>
            </v-badge>
          </v-col>
          <v-col></v-col>
        </v-row>
        <v-row class="text-center">
          <v-col cols="6" class="text-center">
            <p class="pp-cation-reg">
              {{ $t('User ID') }}
            </p>
            <span
              style="
                display: block;
                word-wrap: break-word;
                width: 200px;
                white-space: normal;
                font-size: 14px !important;
              "
              class="text-center justify-center align-center"
            >
              {{ data.uid ? data.uid : '-' }}
            </span>
          </v-col>
          <v-col cols="6" class="text-center">
            <p class="pp-cation-reg">
              <!-- {{ $t('status') }}  -->
              {{ $t('Provider') }}
            </p>
            <p class="pp-body-reg-1 text-capitalize">
              <!-- {{ data.status === '1' ? 'Active' : 'Inactive' }} -->
              {{ data.provider ? data.provider : '-' }}
            </p>
          </v-col>
        </v-row>
      </v-col>

      <v-divider
        v-if="bp.mdAndUp"
        vertical
        class="mt-8"
        style="height: 500px"
      />

      <!-- Other Information -->
      <v-col cols="12" md="4" sm="12" class="mt-8">
        <v-row class="py-5">
          <p class="font-weight-medium pp-cation-reg px-3">
            {{ $t('Other details') }}
            <!-- +
              ' ( ' +
              (partner && partner.gender ? partner.gender : '-') +
              ' )' -->
          </p>
          <v-list-item>
            <v-list-item-icon class="mr-5">
              <v-btn fab small depressed class="#575A6A">
                <v-icon color="secondary">mdi-account-outline</v-icon>
              </v-btn>
            </v-list-item-icon>
            <v-list-item-content>
              <span class="pp-cation-reg">
                {{ $t('First Name') }}
              </span>
              <v-skeleton-loader v-if="loading" type="text"></v-skeleton-loader>
              <span v-else class="pp-body-reg-1">
                {{
                  data.first_name
                }}
              </span>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon class="mr-5">
              <v-btn fab small depressed class="#575A6A">
                <v-icon color="secondary">mdi-account-outline</v-icon>
              </v-btn>
            </v-list-item-icon>
            <v-list-item-content>
              <span class="pp-cation-reg">
                {{ $t('Last Name') }}
              </span>
              <v-skeleton-loader v-if="loading" type="text"></v-skeleton-loader>
              <span v-else class="pp-body-reg-1">
                {{
                  data.last_name ? data.last_name : '-'
                }}
              </span>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon class="mr-5">
              <v-btn fab small depressed class="#575A6A">
                <v-icon color="secondary">mdi-cellphone</v-icon>
              </v-btn>
            </v-list-item-icon>
            <v-list-item-content>
              <span class="pp-cation-reg">
                {{ $t('Phone') }}
              </span>
              <v-skeleton-loader v-if="loading" type="text"></v-skeleton-loader>
              <span v-else class="pp-body-reg-1">
                 {{ data.phone ? data.country_code ? data.country_code + data.phone : data.phone : '-' }}
              </span>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon class="mr-5">
              <v-btn fab small depressed class="#575A6A">
                <v-icon color="secondary">mdi-email</v-icon>
              </v-btn>
            </v-list-item-icon>
            <v-list-item-content>
              <span class="pp-cation-reg">
                {{ $t('Email') }}
              </span>
              <v-skeleton-loader v-if="loading" type="text"></v-skeleton-loader>
              <span v-else class="pp-body-reg-1">
                 {{ data.email ? data.email : '-' }}
              </span>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon class="mr-5">
              <v-btn fab small depressed class="#575A6A">
                <v-icon color="secondary">mdi-map-marker-outline</v-icon>
              </v-btn>
            </v-list-item-icon>
            <v-list-item-content>
              <span class="pp-cation-reg">
                {{ $t('Date Of Birth') }}
              </span>
              <v-skeleton-loader v-if="loading" type="text"></v-skeleton-loader>
              <span v-else class="pp-body-reg-1">
                {{
                  data.dob
                    ? data.dob
                    : '-'
                }}
              </span>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon class="mr-5">
              <v-btn fab small depressed class="#575A6A">
                <v-icon color="secondary">mdi-gender-male-female</v-icon>
              </v-btn>
            </v-list-item-icon>
            <v-list-item-content>
              <span class="pp-cation-reg">
                {{ $t('Gender') }}
              </span>
              <v-skeleton-loader v-if="loading" type="text"></v-skeleton-loader>
              <span v-else class="pp-body-reg-1">
                {{
                  data.gender
                    ? data.gender
                    : '-'
                }}
              </span>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon class="mr-5">
              <v-btn fab small depressed class="#575A6A">
                <v-icon color="secondary">mdi-calendar</v-icon>
              </v-btn>
            </v-list-item-icon>
            <v-list-item-content>
            <span class="pp-cation-reg">
              {{ $t('Created at') }}
            </span>
              <v-skeleton-loader v-if="loading" type="text"></v-skeleton-loader>
              <span v-else class="pp-body-reg-1">
              {{
                  data.created_at
                    ? new Date(data.created_at)
                      .toISOString()
                      .substr(0, 10)
                    : '-'
                }}
            </span>
            </v-list-item-content>
          </v-list-item>
        </v-row>
      </v-col>

      <v-divider
        v-if="bp.mdAndUp"
        vertical
        class="mt-8"
        style="height: 500px"
      />

      <!-- Address Info  -->
      <v-col cols="12" md="4" sm="12" class="mt-8">
        <p class="font-weight-medium pp-cation-reg px-3">
          {{ $t('Delivery Address') }}
        </p>
        <v-list-item>
          <v-list-item-icon class="mr-5">
            <v-btn fab small depressed class="#575A6A">
              <v-icon color="secondary">mdi-music-accidental-sharp</v-icon>
            </v-btn>
          </v-list-item-icon>
          <v-list-item-content>
            <span class="pp-cation-reg">
              {{ $t('UID') }}
            </span>
            <v-skeleton-loader v-if="loading" type="text"></v-skeleton-loader>
            <span v-else class="pp-body-reg-1">
              {{ address.uid ? address.uid : '-' }}
            </span>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon class="mr-5">
            <v-btn fab small depressed class="#575A6A">
              <v-icon color="secondary">mdi-home-outline</v-icon>
            </v-btn>
          </v-list-item-icon>
          <v-list-item-content>
            <span class="pp-cation-reg">
              {{ $t('Address Name') }}
            </span>
            <v-skeleton-loader v-if="loading" type="text"></v-skeleton-loader>
            <span v-else class="pp-body-reg-1">
              {{
                address.address_name
                  ? address.address_name
                  : '-'
              }}
            </span>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon class="mr-5">
            <v-btn fab small depressed class="#575A6A">
              <v-icon color="secondary">mdi-apple-keyboard-option</v-icon>
            </v-btn>
          </v-list-item-icon>
          <v-list-item-content>
            <span class="pp-cation-reg">
              {{ $t('Street') }}
            </span>
            <v-skeleton-loader v-if="loading" type="text"></v-skeleton-loader>
            <span v-else class="pp-body-reg-1">
              {{
                address.street
                  ? address.street
                  : '-'
              }}
            </span>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon class="mr-5">
            <v-btn fab small depressed class="#575A6A">
              <v-icon color="secondary">mdi-chart-histogram</v-icon>
            </v-btn>
          </v-list-item-icon>
          <v-list-item-content>
            <span class="pp-cation-reg">
              {{ $t('City') }}
            </span>
            <v-skeleton-loader v-if="loading" type="text"></v-skeleton-loader>
            <span v-else class="pp-body-reg-1 text-capitalize">
              {{
                address.city
                  ? address.city
                  : '-'
              }}
            </span>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon class="mr-5">
            <v-btn fab small depressed class="#575A6A">
              <v-icon color="secondary">mdi-chart-gantt</v-icon>
            </v-btn>
          </v-list-item-icon>
          <v-list-item-content>
            <span class="pp-cation-reg">
              {{ $t('State') }}
            </span>
            <v-skeleton-loader v-if="loading" type="text"></v-skeleton-loader>
            <span v-else class="pp-body-reg-1 text-capitalize">
              {{
                address.state
                  ? address.state
                  : '-'
              }}
            </span>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon class="mr-5">
            <v-btn fab small depressed class="#575A6A">
              <v-icon color="secondary">mdi-share</v-icon>
            </v-btn>
          </v-list-item-icon>
          <v-list-item-content>
            <span class="pp-cation-reg">
              {{ $t('Zip Code') }}
            </span>
            <v-skeleton-loader v-if="loading" type="text"></v-skeleton-loader>
            <span v-else class="pp-body-reg-1 text-capitalize">
              {{
                address.zip_code
                  ? address.zip_code
                  : '-'
              }}
            </span>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'UserInfo',
  props: {
    data: {
      required: true,
      type: Object
    },
    address: {
      required: true,
      type: Object
    },
    loading: {
      required: true,
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
