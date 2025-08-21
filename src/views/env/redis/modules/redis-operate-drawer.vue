<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useNaiveForm } from '@/hooks/common/form';
import { useDict } from '@/hooks/business/dict';
import { $t } from '@/locales';

defineOptions({
  name: 'RedisOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Env.Redis | null;
}

const props = defineProps<Props>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { options: envCvmRunningStatusOptions } = useDict('env_cvm_running_status');

const { restoreValidation } = useNaiveForm();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: '新增redis增强版',
    edit: '查看redis增强版'
  };
  return titles[props.operateType];
});

type Model = Api.Env.RedisOperateParams;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    redisId: '',
    name: '',
    runningStatus: '',
    project: '',
    location: '',
    az: '',
    vpc: '',
    vpcSub: '',
    ipv4: '',
    port: undefined,
    archVersion: '',
    productVersion: '',
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
  { label: 'redis主键', key: 'redisId' },
  { label: '名称', key: 'name' },
  {
    label: '运行状态',
    key: 'runningStatus',
    formatter: (value: any) => envCvmRunningStatusOptions.value.find(opt => opt.value === value)?.label || '-'
  },
  { label: '所属项目', key: 'project' },
  { label: '地域', key: 'location' },
  { label: '可用区', key: 'az' },
  { label: '所属网络', key: 'vpc' },
  { label: '所在子网', key: 'vpcSub' },
  { label: '主IPv4内网IP', key: 'ipv4' },
  { label: '端口', key: 'port' },
  { label: '架构版本', key: 'archVersion' },
  { label: '产品版本', key: 'productVersion' },
  { label: '租户', key: 'tenantAppId' }
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
