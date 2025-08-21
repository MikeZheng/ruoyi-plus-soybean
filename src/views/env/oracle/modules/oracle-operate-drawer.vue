<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useNaiveForm } from '@/hooks/common/form';
import { useDict } from '@/hooks/business/dict';
import { $t } from '@/locales';

defineOptions({
  name: 'OracleOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Env.Oracle | null;
}

const props = defineProps<Props>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { options: envCvmRunningStatusOptions } = useDict('env_cvm_running_status');

const { restoreValidation } = useNaiveForm();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: '新增oracle',
    edit: '查看oracle'
  };
  return titles[props.operateType];
});

type Model = Api.Env.OracleOperateParams;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    oracleId: '',
    name: '',
    runningStatus: '',
    version: '',
    performance: '',
    maxTablespace: undefined,
    maxIops: undefined,
    maxIomb: undefined,
    role: '',
    az: '',
    vpc: '',
    tenantAppId: ''
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
  { label: 'oracle主键', key: 'oracleId' },
  { label: '名称', key: 'name' },
  { label: '版本', key: 'version' },
  { label: '配置', key: 'performance' },
  { label: '库空间限额(GB)', key: 'maxTablespace' },
  { label: '最大IOPS', key: 'maxIops' },
  { label: '最大IOMB(MB)', key: 'maxIomb' },
  { label: '角色', key: 'role' },
  { label: '可用区', key: 'az' },
  { label: '网络', key: 'vpc' },
  { label: '租户', key: 'tenantAppId' },
  {
    label: '运行状态',
    key: 'runningStatus',
    formatter: (value: any) => envCvmRunningStatusOptions.value.find(opt => opt.value === value)?.label || '-'
  }
];
</script>

<template>
  <NDrawer v-model:show="visible" :title="title" display-directive="show" :width="800" class="max-w-90%">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NCard :bordered="false" class="info-card card-wrapper">
        <NSpin :show="false">
          <NDescriptions
            v-for="field in fieldConfigs"
            :key="field.key"
            :column="2"
            bordered
            label-placement="left"
            label-class="w-150px"
          >
            <NDescriptionsItem :label="field.label">
              {{
                field.formatter
                  ? field.formatter(model[field.key as keyof Model])
                  : model[field.key as keyof Model] || '-'
              }}
            </NDescriptionsItem>
          </NDescriptions>
        </NSpin>
      </NCard>

      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.return') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
