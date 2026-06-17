import React from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { InteractiveStepNode } from './InteractiveStepNode';

export interface WorkflowStepData {
  id: string;
  label: string;
  description: string;
  Icon: LucideIcon;
}

export interface WorkflowPhase {
  titleKey: string;
  steps: WorkflowStepData[];
}

interface MultiPhaseWorkflowDiagramProps {
  flows: WorkflowPhase[];
  activeStepId: string | null;
  onStepChange: (id: string) => void;
  t: (key: string) => string;
}

export const MultiPhaseWorkflowDiagram: React.FC<MultiPhaseWorkflowDiagramProps> = ({ flows, activeStepId, onStepChange, t }) => {
  const theme = useTheme();

  // Collect all steps for lookup
  const allSteps = flows.flatMap(f => f.steps);

  const renderFlow = (titleKey: string, steps: WorkflowStepData[]) => (
    <Box sx={{ mb: 8 }}>
      <Typography variant="h5" color="primary" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
        {t(titleKey)}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        {/* Connecting Line */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '5%',
            right: '5%',
            height: '2px',
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)' 
              : 'linear-gradient(90deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.05) 100%)',
            transform: 'translateY(-50%)',
            zIndex: -1,
            display: { xs: 'none', md: 'block' }
          }}
        />

        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <InteractiveStepNode
              index={index}
              label={t(step.label)}
              description={t(step.description)}
              Icon={step.Icon}
              isActive={activeStepId === step.id}
              onClick={() => onStepChange(step.id)}
            />
            {index < steps.length - 1 && (
              <Box 
                sx={{ 
                  alignSelf: 'center', 
                  opacity: 0.2, 
                  display: { xs: 'none', md: 'block' }
                }}
              >
                <ArrowRight size={24} />
              </Box>
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ py: 8, position: 'relative', overflow: 'hidden' }}>
      <Container maxWidth="lg">
        {flows.map((flow, i) => (
          <React.Fragment key={i}>
            {renderFlow(flow.titleKey, flow.steps)}
          </React.Fragment>
        ))}

        {/* Dynamic Description Area */}
        <AnimatePresence mode="wait">
          {activeStepId && (
            <motion.div
              key={activeStepId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{
                marginTop: '2rem',
                textAlign: 'center',
                padding: '2rem',
                background: theme.palette.background.paper,
                borderRadius: '16px',
                border: `1px solid ${theme.palette.divider}`,
                backdropFilter: 'blur(10px)',
              }}
            >
              <Typography variant="h5" color="primary" gutterBottom>
                {t(allSteps.find(s => s.id === activeStepId)?.label || '')}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
                {t(allSteps.find(s => s.id === activeStepId)?.description || '')}
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};
