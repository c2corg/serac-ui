<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import c2c from '@/services/c2c.service';
import { sanitize } from 'dompurify';

@Component
export default class HelperMixin extends Vue {
  helper(id: string) {
    c2c
      .help(id)
      .then(({ title, description }) =>
        this.$buefy.dialog.alert({
          title,
          message: sanitize(description),
          size: 'is-small',
        })
      )
      .catch(() => {
        this.$buefy.toast.open({
          type: 'is-danger',
          message: this.$t('helper.error').toString(),
        });
      });
  }
}
</script>
