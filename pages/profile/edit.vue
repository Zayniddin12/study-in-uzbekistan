<template>
  <section>
    <UIBreadcrumb :breadcrumb="breadcrumbRoutes" />

    <CabinetHeader class="my-6 hidden lg:block" />
    <!--this is commit-->
    <div class="container pb-16">
      <div class="md:flex items-start gap-6">
        <div class="w-full mb-6 md:mb-0 md:max-w-[278px]">
          <UIStepper
            :current-step="storeCabinet.step"
            :steps="steps"
            class="pointer-events-none"
            @change-step="changeCurrentStep"
          />
        </div>

        <!--        call get data default-->
        <span>{{ getUserData }}</span>
        <div class="w-full">
          <UIStepperWrapper
            ref="userForm"
            :current-step="storeCabinet.step"
            :next-button-disabled="disabledButtonForms"
            :submit-button-disabled="cabinetMoverLetterForm.$v.value.$invalid"
            :submit-button-loading="submitButtonLoading"
            :title="t(steps[storeCabinet.step]?.title)"
            @handle-step="handleFromStep"
            @submit-profile="handleSubmitProfile"
            @save-profile="saveProfile"
          >
            <SectionsCabinetPersonalInfo
              v-if="steps[0]?.check === storeCabinet.step"
              :form="personalInfoForm"
            />
            <SectionsCabinetContactInfo
              v-if="steps[1]?.check === storeCabinet.step"
              :form="cabinetContactForm"
              @trigger="trigger"
            />
            <SectionsCabinetEducation
              v-if="steps[2]?.check === storeCabinet.step"
              :form="cabinetEducationForm"
            />
            <SectionsCabinetWhereWantToStudy
              v-if="steps[3]?.check === storeCabinet.step"
              :form="whereWantToStudyForm"
            />
            <SectionsCabinetFormOfTraining
              v-if="steps[4]?.check === storeCabinet.step"
              :form="formOfTrainingForm"
              :want-study-form="whereWantToStudyForm.values"
            />
            <SectionsCabinetMotivationLetter
              v-if="steps[5]?.check === storeCabinet.step"
              :form="cabinetMoverLetterForm"
            />
          </UIStepperWrapper>
          <!--            :university-name="planningUniversity"-->
          <!--          <ProfileInfo :show="true" @close="show = false" />-->
        </div>
      </div>
    </div>

    <pre class="hidden">{{ cabinetEducationForm }}</pre>
  </section>
</template>

<script lang="ts" setup>
import { email, maxLength, required } from '@vuelidate/validators'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

import CabinetHeader from '~/components/Sections/Cabinet/CabinetHeader.vue'
import { englishLevelsEnum } from '~/data/profile'
import { useAuthStore } from '~/store/auth'
import { cabinetStore } from '~/store/cabinet'
import { useProfileStore } from '~/store/profile'
import type {
  ICabinetContactForm,
  IProfileFeatures,
  IUser,
} from '~/types/profile'
import { differTwoObject } from '~/utils/differenceTwoObjects'
import { removePhoneNumberCode } from '~/utils/removePhoneCode'
import {
  validatePhoneNumber,
  validateUrlOrTelegramOrWhatsapp,
} from '~/utils/validations'

definePageMeta({
  layout: 'custom',
})

const { t } = useI18n()
const { showToast } = useCustomToast()
const profileStore = useProfileStore()
const authStore = useAuthStore()
const storeCabinet = cabinetStore()
const router = useRouter()

const breadcrumbRoutes = computed(() => [
  {
    title: t('personal_account'),
    link: '/cabinet',
  },
  {
    title: t('personal_account'),
    link: '/profile/edit',
  },
])

const englishLevel = computed(
  () => authStore.user?.english_level ?? authStore.user?.english_level_display
)

const currentStep = ref(storeCabinet.step)

const userForm = ref()
const isSaved = ref(false)
const submitUserData = ref<IUser>()
const submitButtonLoading = ref(false)

function changeCurrentStep(step: number) {
  currentStep.value = step
}

const steps = computed(() => [
  {
    title: t('personal_info'),
    icon: 'icon-user-circle',
    check: 0,
  },
  {
    title: t('contact_info'),
    icon: 'icon-clipboard-list',
    check: 1,
  },
  {
    title: t('edu_skills'),
    icon: 'icon-lightbulb',
    check: 2,
  },
  {
    title: t('where_study'),
    icon: 'icon-compass',
    check: 3,
  },
  {
    title: t('education_form'),
    icon: 'icon-checklist',
    check: 4,
  },
  {
    title: t('motivation_text'),
    icon: 'icon-messages',
    check: 5,
  },
])

const personalInfoForm = useForm(
  {
    first_name: '',
    last_name: '',
    middle_name: '',
    birth_date: '',
    gender: '',
    country: -1,
    photo: '',
  },
  {
    first_name: {
      required,
    },
    last_name: {
      required,
    },
    middle_name: {},
    birth_date: {
      required,
    },
    gender: {},
    country: {
      required,
    },
    photo: {
      required,
    },
  },
  {
    $registerAs: 'profile',
    $scope: 1,
  }
)

const cabinetContactForm = useForm(
  {
    contact_email: '',
    contact_phone: '+998',
    contact_telegram: '',
    contact_whatsapp: '',
  },
  {
    contact_email: {
      email,
    },
    contact_phone: {
      required,
    },
    contact_telegram: {
      validateUrlOrTelegramOrWhatsapp,
    },
    contact_whatsapp: {
      validateUrlOrTelegramOrWhatsapp,
    },
  },
  {
    $registerAs: 'contanct',
    $scope: 2,
  }
)
const validationErr = ref(false)
function trigger(item: boolean) {
  validationErr.value = item
}

const whereWantToStudyForm = useForm(
  {
    study_plan_degree: '',
    study_plan_degree_extra: '',
    study_plan_year: 1,
  },
  {
    study_plan_degree: {
      required,
    },
    study_plan_year: {
      required,
    },
  },
  {
    $registerAs: 'study',
    $scope: 3,
  }
)

const formOfTrainingForm = useForm(
  {
    study_plan_form: 0,
    study_plan_univer_direction: '',
    study_plan_universities: '',
  },
  {
    study_plan_form: {},
    study_plan_univer_direction: {},
    study_plan_universities: {
      required,
    },
  },
  {
    $registerAs: 'training',
    $scope: 4,
  }
)

const cabinetEducationForm = useForm(
  {
    edu_degree: '',
    edu_country: '',
    edu_place: '',
    edu_place_display: '',
    edu_finished_year: '',
    edu_started_year: '',
    native_lang: '',
    english_level: '',
  },
  {
    edu_degree: {
      required,
    },
    edu_country: {
      required,
    },
    edu_place: {
      required,
    },
    edu_finished_year: {
      required,
      checkFinishYear,
    },
    edu_started_year: {
      required,
      checkStartYear,
    },
    native_lang: {
      required,
    },
    english_level: {
      required,
    },
  },
  {
    $registerAs: 'education',
    $scope: 5,
  }
)

function checkStartYear() {
  return cabinetEducationForm.values.edu_started_year ||
    cabinetEducationForm.values.edu_finished_year
    ? cabinetEducationForm.values.edu_started_year <
        cabinetEducationForm.values.edu_finished_year
    : false
}

function checkFinishYear() {
  //   finished year should not be greater than 7 years starting from edu_started_year
  return (
    cabinetEducationForm.values.edu_started_year <
    cabinetEducationForm.values.edu_finished_year
  )
}

const cabinetMoverLetterForm = useForm(
  {
    motivational_letter: '',
  },
  {
    motivational_letter: {
      required,
      maxlength: maxLength(650),
    },
  }
)

const getEnglishLevel = (lang: string) => {
  for (let i = 0; i < englishLevelsEnum.length; i++) {
    if (englishLevelsEnum[i] === lang) {
      return {
        id: ++i,
        name: t(`english_levels.${lang}`),
      }
    }
  }
}

// get all user's data
const getUserData = computed(() => {
  personalInfoForm.values.photo = authStore.user?.photo?.file
  profileStore.imageId = authStore.user?.photo?.id
  personalInfoForm.values.first_name = authStore.user?.first_name
  personalInfoForm.values.last_name = authStore.user.last_name
  personalInfoForm.values.middle_name = authStore.user.middle_name
  personalInfoForm.values.birth_date = authStore.user.birth_date
  personalInfoForm.values.gender = authStore.user.gender
  // @ts-ignore
  personalInfoForm.values.country = authStore.user.country?.id
  personalInfoForm.values.countryName = authStore.user.country?.name

  cabinetContactForm.values.contact_email = authStore.user.contact_email
  cabinetContactForm.values.contact_phone =
    '+998' + authStore.user.contact_phone
  cabinetContactForm.values.contact_whatsapp = authStore.user.contact_whatsapp
  cabinetContactForm.values.contact_telegram = authStore.user.contact_telegram

  // @ts-ignore
  cabinetEducationForm.values.english_level = getEnglishLevel(
    englishLevel.value
  )

  // @ts-ignore
  cabinetEducationForm.values.edu_finished_year = new Date(
    authStore.user.edu_finished_year
  ).getTime()
  // authStore.user.edu_finished_year
  cabinetEducationForm.values.edu_started_year = new Date(
    authStore.user.edu_started_year
  ).getTime()
  cabinetEducationForm.values.edu_country = authStore.user.edu_country
  cabinetEducationForm.values.edu_degree = authStore.user.edu_degree

  cabinetEducationForm.values.edu_place = authStore.user.edu_place
  cabinetEducationForm.values.edu_place_display = authStore.user.edu_place
  cabinetEducationForm.values.native_lang = authStore.user.native_lang

  // @ts-ignore
  whereWantToStudyForm.values.study_plan_degree =
    authStore.user.study_plan_degree?.id
  // @ts-ignore
  whereWantToStudyForm.values.study_plan_year = authStore.user.study_plan_year

  formOfTrainingForm.values.study_plan_form = authStore.user.study_plan_form
  // @ts-ignore
  formOfTrainingForm.values.study_plan_univer_direction =
    authStore.user.study_plan_univer_direction?.id
  // study_plan_univer_direction_name

  formOfTrainingForm.values.study_plan_univer_direction_name =
    authStore.user.study_plan_univer_direction?.name
  // @ts-ignore
  // formOfTrainingForm.values.study_plan_universities = [
  //   authStore.user.study_plan_univer?.id,
  // ]

  cabinetMoverLetterForm.values.motivational_letter =
    authStore.user.motivational_letter

  if (single.value?.id) {
    // @ts-ignore
    whereWantToStudyForm.values.study_plan_degree = single.value?.degree
    whereWantToStudyForm.values.study_plan_year = authStore.user.study_plan_year
    formOfTrainingForm.values.study_plan_form = single.value?.study_form
    // @ts-ignore
    formOfTrainingForm.values.study_plan_univer_direction =
      single.value?.direction?.id

    currentStep.value = 3
  }
})

const validateAllForms = () => {
  switch (currentStep.value) {
    case 0:
      personalInfoForm.$v.value.$touch()
      if (!personalInfoForm.$v.value.$invalid) {
        const data = { ...personalInfoForm.values }

        if (profileStore.imageId) {
          data.photo = profileStore.imageId
        }

        data.birth_date = dayjs(data.birth_date).format('YYYY-MM-DD')

        partialSaveComponent(data)
          .then((res) => {
            personalInfoForm.values.photo = res.photo?.file
            currentStep.value++
          })
          .catch((err) => {
            showToast(err, 'error')
          })
      }
      break
    case 1:
      cabinetContactForm.$v.value.$touch()
      if (!cabinetContactForm.$v.value.$invalid) {
        const data = contactDataUpdate(cabinetContactForm.values)

        partialSaveComponent(data)
          .then((res) => {
            cabinetContactForm.values.contact_phone = '+998' + res.contact_phone
            cabinetContactForm.values.contact_telegram = res.contact_telegram
            cabinetContactForm.values.contact_whatsapp = res.contact_whatsapp

            currentStep.value++
          })
          .catch((err) => {
            showToast(err, 'error')
          })
      }
      break
    case 2:
      cabinetEducationForm.$v.value.$touch()
      if (!cabinetEducationForm.$v.value.$invalid) {
        const differCabinetEducation = differTwoObject(
          authStore.user,
          cabinetEducationForm.values
        )
        if (typeof differCabinetEducation.english_level === 'number') {
          differCabinetEducation.english_level = englishLevelsEnum.find(
            (_: string, index: number) =>
              differCabinetEducation.english_level == ++index
          )
        } else {
          delete differCabinetEducation.english_level
        }

        if (Object.keys(differCabinetEducation).length === 0)
          return currentStep.value++

        partialSaveComponent(differCabinetEducation)
          .then((res) => {
            cabinetEducationForm.values.native_lang_text = res.native_lang_text
            currentStep.value++
          })
          .catch((err) => {
            return err
          })
      }
      break
    case 3:
      whereWantToStudyForm.$v.value.$touch()
      if (!whereWantToStudyForm.$v.value.$invalid) {
        const differWhereWantToStudyForm = differTwoObject(
          authStore.user,
          whereWantToStudyForm.values
        )

        if (Object.keys(differWhereWantToStudyForm).length === 0)
          return currentStep.value++

        partialSaveComponent(differWhereWantToStudyForm)
          .then(() => currentStep.value++)
          .catch((err) => {
            return err
          })
      }

      break
    case 4:
      formOfTrainingForm.$v.value.$touch()
      if (!formOfTrainingForm.$v.value.$invalid) {
        const differData = differTwoObject(
          authStore.user,
          formOfTrainingForm.values
        )

        if (Object.keys(differData).length === 0) return currentStep.value++

        partialSaveComponent(differData)
          .then((res) => {
            submitUserData.value = res
            currentStep.value++
          })
          .catch((err) => {
            return err
          })
      }

      break
    case 5:
      cabinetMoverLetterForm.$v.value.$touch()
      break
  }
}

const disabledButtonForms = computed(() => {
  switch (currentStep.value) {
    case 0:
      return personalInfoForm.$v.value.$invalid
    case 1:
      return cabinetContactForm.$v.value.$invalid || validationErr.value
    case 2:
      return cabinetEducationForm.$v.value.$invalid
    case 3:
      return whereWantToStudyForm.$v.value.$invalid
    case 4:
      return formOfTrainingForm.$v.value.$invalid
    case 5:
      return false
    default:
      return false
  }
})

const contactDataUpdate = (
  contactData: ICabinetContactForm
): ICabinetContactForm => {
  const newData = { ...contactData }

  newData.contact_phone = removePhoneNumberCode(newData.contact_phone)
  if (
    newData.contact_telegram &&
    !newData.contact_telegram?.includes('https://')
  ) {
    newData.contact_telegram = 'https://' + newData.contact_telegram
  }

  if (
    newData.contact_whatsapp &&
    !newData.contact_whatsapp?.includes('https://')
  ) {
    newData.contact_whatsapp = 'https://' + newData.contact_whatsapp
  }

  return newData
}

const saveProfile = () => {
  const differData = differTwoObject(
    authStore.user,
    cabinetMoverLetterForm.values
  )

  partialSaveComponent(differData)
    .then(() => {
      isSaved.value = true
      showToast(t('success_messages.profile_save'), 'success')
      router.push('/cabinet')
    })
    .catch((err) => {
      showError(err)
    })
}

const partialSaveComponent = async (partialData: IProfileFeatures) => {
  const res = await profileStore.saveProfile(partialData)
  return res
    ? (submitUserData.value = res)
    : (submitUserData.value = authStore.user)
}

const checkObject = (obj) => {
  return obj && Object.keys(obj).length
}

function replaceValuesWithIdOrCode(newObj) {
  const obj = { ...newObj }
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      obj[key] = replaceValuesWithIdOrCode(obj[key])
      if ('id' in obj[key]) {
        obj[key] = obj[key].id
      } else {
        // If "id" doesn't exist, use "code" as a default value
        obj[key] = 'code' in obj[key] ? obj[key].code : obj[key]
      }
    }
  }
  return obj
}

const handleSubmitProfile = () => {
  submitButtonLoading.value = true

  if (!submitUserData.value) {
    submitUserData.value = replaceValuesWithIdOrCode(authStore.user)
  } else {
    // if (typeof submitUserData.value.study_plan_univer !== 'number') {
    //     submitUserData.value.study_plan_univer?.id
    // }
    submitUserData.value.photo = submitUserData.value?.photo?.id
  }
  if (formOfTrainingForm.values.study_plan_universities?.length) {
    // @ts-ignore
    submitUserData.value.study_plan_universities =
      formOfTrainingForm.values.study_plan_universities
  }
  // @ts-ignore
  submitUserData.value.motivational_letter =
    cabinetMoverLetterForm.values.motivational_letter

  if (submitUserData.value) {
    profileStore
      .submitProfile(submitUserData.value)
      .then(() => {
        router.push('/cabinet/my-applications')
        showToast(t('profile.modal.message'), 'success')
      })
      .finally(() => (submitButtonLoading.value = false))
  }
}

const handleFromStep = (value: string) => {
  if (value === 'prev') {
    currentStep.value--
  }
  if (value === 'next') {
    validateAllForms()
  }
}

const single = ref()
const store = cabinetStore()

const selectedProgramId = computed(() => store.programId)

function getSingle() {
  useApi()
    .$get(`/university/programs/${selectedProgramId.value}/`)
    .then((res) => {
      single.value = res
    })
}

onMounted(() => {
  getSingle()
})

watch(
  () => currentStep.value,
  () => {
    storeCabinet.step = currentStep.value
  }
)
</script>
