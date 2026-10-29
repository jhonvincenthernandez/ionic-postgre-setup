<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Name Age CRUD</ion-title>
      </ion-toolbar>
    </ion-header>
 
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-content>
          <ion-badge :color="connectionStatus === 'Connected' ? 'success' : connectionStatus === 'Checking' ? 'medium' : 'danger'">
            SQL Connect + PostgreSQL: {{ connectionStatus }}
          </ion-badge>
          <p class="ion-margin-top">
            Connected means the people list query completed successfully.
          </p>
        </ion-card-content>

      </ion-card>
 
      <ion-card>
        <ion-card-header>
          <ion-card-title>{{ editingId ? 'Edit Person' : 'Add Person' }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-item>
            <ion-input
              v-model="name"
              label="Name"
              label-placement="stacked"
              placeholder="Enter name"
              maxlength="100"
            />
          </ion-item>
          <ion-item>
            <ion-input
              v-model="age"
              label="Age"
              label-placement="stacked"
              type="number"
              min="0"
              max="120"
              placeholder="Enter age (0-120)"
            />
          </ion-item>
          <ion-button expand="block" class="ion-margin-top" :disabled="saving" @click="savePerson">
            {{ saving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Person' }}
          </ion-button>
          <ion-button
            v-if="editingId"
            expand="block"
            fill="outline"
            color="medium"
            :disabled="saving"
            @click="cancelEdit"
          >
            Cancel Edit
          </ion-button>
          <ion-text v-if="message" color="medium"><p>{{ message }}</p></ion-text>
        </ion-card-content>
      </ion-card>
 
      <ion-card>
        <ion-card-header>
          <ion-card-title>People Records</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-button expand="block" fill="outline" :disabled="loading" @click="loadPeople">
            {{ loading ? 'Loading...' : 'Refresh Records' }}
          </ion-button>
          <ion-text v-if="loadError" color="danger"><p>{{ loadError }}</p></ion-text>
          <ion-text v-if="!loading && people.length === 0" color="medium">
            <p class="empty-message">No records yet. Add the first person above.</p>
          </ion-text>
          <ion-list v-if="people.length > 0">
            <ion-item v-for="person in people" :key="person.id">
              <ion-label>
                <h2>{{ person.name }}</h2>
                <p>Age: {{ person.age }}</p>
              </ion-label>
              <ion-button slot="end" fill="clear" :disabled="deletingId !== null" @click="editPerson(person)">
                Edit
              </ion-button>
              <ion-button
                slot="end"
                color="danger"
                fill="clear"
                :disabled="deletingId !== null"
                @click="removePerson(person.id)"
              >
                {{ deletingId === person.id ? 'Deleting...' : 'Delete' }}
              </ion-button>
            </ion-item>
          </ion-list>
        </ion-card-content>

      </ion-card>
    </ion-content>
  </ion-page>
</template>
 
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonBadge, IonItem, IonInput, IonButton, IonText, IonList, IonLabel,
} from '@ionic/vue';
import {
  listPeople,
  createPerson,
  updatePerson,
  deletePerson,
} from '@dataconnect/generated';
 
type Person = {
  id: string;
  name: string;
  age: number;
};
 
type ConnectionStatus = 'Checking' | 'Connected' | 'Not confirmed';
 
const people = ref<Person[]>([]);
const name = ref('');
const age = ref('');
const editingId = ref<string | null>(null);
const loading = ref(false);
const saving = ref(false);
const deletingId = ref<string | null>(null);
const message = ref('');
const loadError = ref('');
const connectionStatus = ref<ConnectionStatus>('Checking');
 
async function loadPeople(): Promise<boolean> {
  loading.value = true;
  loadError.value = '';
  try {
    const result = await listPeople();
    people.value = result.data.people as Person[];
    connectionStatus.value = 'Connected';
    return true;
  } catch (error) {
    console.error('Load people failed:', error);
    connectionStatus.value = 'Not confirmed';
    loadError.value = 'Could not load records. Check Firebase config, SQL Connect query, authorization, and network.';
    return false;
  } finally {
    loading.value = false;
  }
}
 
function resetForm() {
  name.value = '';
  age.value = '';
  editingId.value = null;
  message.value = '';
}
 
function editPerson(person: Person) {
  editingId.value = person.id;
  name.value = person.name;
  age.value = String(person.age);
  message.value = '';
}
 
function cancelEdit() {
  resetForm();
}
 

async function savePerson() {
  const cleanName = name.value.trim();
  const ageValue = Number(age.value);
  if (!cleanName) {
    message.value = 'Enter a name.';
    return;
  }
  if (age.value.trim() === '' || !Number.isInteger(ageValue) || ageValue < 0 || ageValue > 120) {
    message.value = 'Enter a whole-number age from 0 to 120.';
    return;
  }
 
  saving.value = true;
  message.value = '';
  const wasEditing = editingId.value !== null;
  try {
    if (editingId.value) {
      await updatePerson({ id: editingId.value, name: cleanName, age: ageValue });
    } else {
      await createPerson({ name: cleanName, age: ageValue });
    }
    resetForm();
    const refreshed = await loadPeople();
    message.value = refreshed
      ? (wasEditing ? 'Person updated.' : 'Person added.')
      : 'Saved, but records could not refresh. Press Refresh Records.';
  } catch (error) {
    console.error('Save person failed:', error);
    message.value = 'Could not save. Check the mutation, authorization, and browser Console.';
  } finally {
    saving.value = false;
  }
}
 
async function removePerson(id: string) {
  if (!window.confirm('Delete this person record?')) return;
  deletingId.value = id;
  message.value = '';
  try {
    await deletePerson({ id });
    const refreshed = await loadPeople();
    message.value = refreshed
      ? 'Person deleted.'
      : 'Deleted, but records could not refresh. Press Refresh Records.';
  } catch (error) {
    console.error('Delete person failed:', error);
    message.value = 'Could not delete. Check the DeletePerson operation and authorization.';
  } finally {
    deletingId.value = null;
  }
}
 
onMounted(() => { void loadPeople(); });
</script>
 
<style scoped>
.empty-message {
  padding: 18px 8px;
  text-align: center;
}
</style>