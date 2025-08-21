<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useNaiveForm } from '@/hooks/common/form';

defineOptions({
  name: 'ElbOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Env.Elb | null;
}

const props = defineProps<Props>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { restoreValidation } = useNaiveForm();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: '新增elb信息',
    edit: '查看elb信息'
  };
  return titles[props.operateType];
});

type Model = Api.Env.ElbOperateParams;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    elbId: '',
    name: '',
    elbStatus: '',
    networkType: '',
    vpc: '',
    instanceLevel: '',
    hostname: '',
    elbCreateTime: '',
    publicNetBandwidth: '',
    ipAddress: '',
    tenantAppId: '',
    status: ''
  };
}

function handleUpdateModelWhenEdit() {
  if (props.operateType === 'add') {
    Object.assign(model, createDefaultModel());
    return;
  }

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
}

function closeDrawer() {
  visible.value = false;
}

watch(visible, () => {
  if (visible.value) {
    handleUpdateModelWhenEdit();
    restoreValidation();
  }
});
const fieldConfigs = [
  { label: 'elb主键', key: 'elbId' },
  { label: '名称', key: 'name' },
  { label: 'IP地址', key: 'ipAddress' },
  { label: 'ELB状态', key: 'elbStatus' },
  { label: '网络类型', key: 'networkType' },
  { label: 'vpc', key: 'vpc' },
  { label: '实例类型', key: 'instanceLevel' },
  { label: '主机名', key: 'hostname' },
  { label: 'ELB创建时间', key: 'elbCreateTime' },
  { label: '带宽', key: 'publicNetBandwidth' },
  { label: '租户', key: 'tenantAppId' }
];
</script>

<template>
  <NDrawer v-model:show="visible" :title="title" display-directive="show" :width="800" class="max-w-90%">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NGrid :cols="2" :x-gap="16" :y-gap="12" responsive="screen" class="pr-4">
        <NGi v-for="field in fieldConfigs" :key="field.key">
          <NFormItem :key="field.key" :label="field.label">
            <NText>
              {{ model[field.key as keyof Model] || '-' }}
            </NText>
          </NFormItem>
        </NGi>
      </NGrid>
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.return') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
